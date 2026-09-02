import { existsSync, rmSync } from "node:fs"
import { join } from "node:path"
import { holding } from "@akasha/command-system/holding"
import { rootOf } from "@akasha/command-system/rooting"
import { said as gitIn } from "@akasha/git/git-running"

const HOOK_NAME = "restore-akasha-when-dirty"

const UNREADABLE = 5

const REFUSED = 2

const GUARDED = "akasha"

const INSIDE = `${GUARDED}/`

const UNTRACKED = "??"

const MOVED = " -> "

const WAITED = 5000

export type Dirty = {
  readonly code: string
  readonly path: string
}

function unquoted(said: string): string {
  return said.startsWith('"') && said.endsWith('"') ? said.slice(1, -1) : said
}

export function dirtyOf(said: string): readonly Dirty[] {
  const found: Dirty[] = []
  for (const line of said.split("\n")) {
    if (line.length < 4) continue
    const code = line.slice(0, 2).trim()
    const rest = line.slice(3)
    const at = rest.includes(MOVED) ? (rest.split(MOVED)[1] ?? rest) : rest
    const path = unquoted(at)
    if (path.startsWith(INSIDE)) found.push({ code, path })
  }
  return found
}

export function dirtyIn(root: string): readonly Dirty[] {
  return dirtyOf(gitIn(root, ["status", "--porcelain", "--", GUARDED]))
}

function committed(root: string, path: string): boolean {
  return gitIn(root, ["ls-tree", "HEAD", "--", path]).trim() !== ""
}

export function restoreIn(root: string): readonly string[] {
  const dirty = dirtyIn(root)
  if (dirty.length === 0) return []
  for (const one of dirty) {
    if (one.code !== UNTRACKED) continue
    if (!one.path.startsWith(INSIDE)) continue
    rmSync(join(root, one.path), { recursive: true, force: true })
  }
  if (dirty.some((one) => one.code !== UNTRACKED)) {
    gitIn(root, ["checkout", "HEAD", "--", GUARDED])
  }
  for (const one of dirtyIn(root)) {
    if (committed(root, one.path)) continue
    if (existsSync(join(root, one.path))) continue
    gitIn(root, ["update-index", "--force-remove", "--", one.path])
  }
  const left = new Set<string>(dirtyIn(root).map((one) => one.path))
  return dirty
    .map((one) => one.path)
    .filter((one) => !left.has(one))
    .sort()
}

export function saying(put: readonly string[]): string {
  const many = put.length === 1 ? "1 path" : `${put.length} paths`
  return [
    `${HOOK_NAME}: this call left the akasha folder changed outside the gate.`,
    `The akasha folder is never left changed and uncommitted, so ${many} went back as HEAD has it:`,
    "",
    ...put.map((one) => `  ${one}`),
    "",
    "The akasha commands write that folder — they check the change and commit it.",
    "Write the body outside `akasha/` first, then land it:",
    "",
    '  akasha write --file-path <path> --content-file <body> --message "<what this is for>"',
  ].join("\n")
}

async function main(): Promise<number> {
  const raw = await Bun.stdin.text()
  if (raw.trim() === "") return 0
  try {
    JSON.parse(raw)
  } catch {
    process.stderr.write(`${HOOK_NAME}: the hook payload would not read, so nothing was judged\n`)
    return UNREADABLE
  }
  const root = rootOf(import.meta.path)
  if (dirtyIn(root).length === 0) return 0
  let put: readonly string[] = []
  try {
    put = holding(root, () => restoreIn(root), WAITED)
  } catch {
    return 0
  }
  if (put.length === 0) return 0
  const said = saying(put)
  process.stderr.write(`${said}\n`)
  process.stdout.write(`${JSON.stringify({ decision: "block", reason: said }, null, 2)}\n`)
  return REFUSED
}

if (import.meta.main) process.exit(await main())
