import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
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

const KEPT_IN = join(".git", "akasha-restored")

const KEPT_RUNS = 50

export type Dirty = {
  readonly code: string
  readonly path: string
}

export type Restored = {
  readonly put: readonly string[]
  readonly kept: string | null
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

export function stampOf(at: Date, of: number): string {
  return `${at.toISOString().replace(/[:.]/g, "-")}-${of}`
}

export function prunedIn(root: string, most: number): readonly string[] {
  const at = join(root, KEPT_IN)
  if (!existsSync(at)) return []
  const held = readdirSync(at).sort()
  const gone = held.slice(0, Math.max(0, held.length - most))
  for (const one of gone) rmSync(join(at, one), { recursive: true, force: true })
  return gone
}

export function keptOf(root: string, dirty: readonly Dirty[], into: string): string | null {
  const at = join(root, KEPT_IN, into)
  let any = false
  for (const one of dirty) {
    const from = join(root, one.path)
    if (!existsSync(from)) continue
    const to = join(at, one.path)
    mkdirSync(dirname(to), { recursive: true })
    cpSync(from, to, { recursive: true })
    any = true
  }
  return any ? at : null
}

export function restoreIn(root: string): Restored {
  const dirty = dirtyIn(root)
  if (dirty.length === 0) return { put: [], kept: null }
  const kept = keptOf(root, dirty, stampOf(new Date(), process.pid))
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
  const put = dirty
    .map((one) => one.path)
    .filter((one) => !left.has(one))
    .sort()
  if (put.length === 0 && kept !== null) rmSync(kept, { recursive: true, force: true })
  prunedIn(root, KEPT_RUNS)
  return { put, kept: put.length === 0 ? null : kept }
}

export function saying(put: readonly string[], kept: string | null): string {
  const many = put.length === 1 ? "1 path" : `${put.length} paths`
  const where =
    kept === null
      ? ["No body was there to copy, so none was copied."]
      : [
          "This worktree is shared, so a body that went back may be another agent's unlanded work.",
          "Every body was copied out first, each under its own path here:",
          "",
          `  ${kept}`,
        ]
  return [
    `${HOOK_NAME}: this call left the akasha folder changed outside the gate.`,
    `The akasha folder is never left changed and uncommitted, so ${many} went back as HEAD has it:`,
    "",
    ...put.map((one) => `  ${one}`),
    "",
    ...where,
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
  let back: Restored = { put: [], kept: null }
  try {
    back = holding(root, () => restoreIn(root), WAITED)
  } catch {
    return 0
  }
  if (back.put.length === 0) return 0
  const said = saying(back.put, back.kept)
  process.stderr.write(`${said}\n`)
  process.stdout.write(`${JSON.stringify({ decision: "block", reason: said }, null, 2)}\n`)
  return REFUSED
}

export async function ran(): Promise<number> {
  return await main()
}

if (import.meta.main) process.exit(await ran())
