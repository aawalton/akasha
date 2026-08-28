export const summary = "Start a worktree of akasha and work in it"

import { existsSync, mkdirSync, readdirSync, symlinkSync } from "node:fs"
import { join } from "node:path"
import { agentPageFor } from "../../../agent/read-record.ts"
import { seatId } from "../../../agent/writer.ts"
import { pageTypePathIn, placeDirOf } from "../../../page/page-types.ts"
import { landFiles } from "../../../repo/land/land.ts"
import { handOffPush } from "../../../repo/push/push.ts"
import { AKASHA, akashaRoot, ownRepoRoot, VENDOR_ROOT } from "../../../repo/roots/roots.ts"
import { takeSeqOf } from "../../../tools/lib/page-seq.ts"

const FROM = "--from"

const VALUE_FLAGS = [FROM]

const BARE_FLAGS = ["--help", "-h"]

const PAGE_TYPE = "worktree"

const MAIN = "main"

const HOLDING = "worktrees"

const SEAT_ENDING = ".seat.md"

const GIT_DIR = ".git"

export const help = {
  description:
    `${summary}.\n` +
    "\n" +
    "A worktree, its branch and its page carry one name made from the seq this takes, and they " +
    "are taken away together at merge or at abandon. The seq is taken before anything else, so " +
    "two starts at once are safe: the second reads a counter the first already moved. A start " +
    "that dies after taking its seq leaves a number nothing used, which costs nothing, where two " +
    "worktrees at one seq would cost the numbering itself.\n" +
    "\n" +
    "The tree is given a `node_modules` of its own, each entry linked to the one beside it in " +
    "this checkout. Without it the tree cannot run the repository's own code, so it could not be " +
    "checked, and a worktree nothing can check is worth less than no worktree at all.",
  flags: [
    {
      name: FROM,
      description: `The commit to branch from. \`${MAIN}\` where none is named.`,
    },
  ],
}

function fail(reason: string): never {
  process.stderr.write(`error: ${reason}\n`)
  process.exit(1)
}

function rejectUnknownFlags(argv: readonly string[]): void {
  for (const token of argv) {
    if (!token.startsWith("--") && !token.startsWith("-")) continue
    if (VALUE_FLAGS.includes(token) || BARE_FLAGS.includes(token)) continue
    fail(`${token} is not a flag this command takes — run it with --help`)
  }
}

function valueOf(argv: readonly string[], name: string, fallback: string): string {
  const at = argv.indexOf(name)
  if (at === -1) return fallback
  const said = argv[at + 1]
  if (said === undefined || said.startsWith("-")) fail(`${name} takes a value and none followed it`)
  return said
}

function ran(root: string, args: readonly string[]): { ok: boolean; said: string } {
  const proc = Bun.spawnSync(["git", "-C", root, ...args], { stdout: "pipe", stderr: "pipe" })
  const decode = (raw: Uint8Array | null): string =>
    raw === null ? "" : new TextDecoder().decode(raw)
  return {
    ok: (proc.exitCode ?? 1) === 0,
    said: `${decode(proc.stdout)}${decode(proc.stderr)}`.trim(),
  }
}

function seatSlug(): string {
  const id = seatId()
  if (id === null) {
    fail("nothing identifies this agent, so no seat would be answerable for the worktree")
  }
  const page = agentPageFor(id)
  if (page === null) {
    fail(`no seat page names ${id}, so no seat would be answerable for the worktree`)
  }
  const stem = page.split("/").pop() ?? ""
  if (!stem.endsWith(SEAT_ENDING)) fail(`${page} is not a seat page, so no seat could be named`)
  return stem.slice(0, -SEAT_ENDING.length)
}

function holdingRoot(): string {
  const home = process.env.HOME
  if (home === undefined || home === "") {
    fail(`$HOME is unset, so nothing says where ${HOLDING} stands and no tree could be placed`)
  }
  return home
}

function vendorDirs(root: string): readonly string[] {
  const found: string[] = []
  const walk = (at: string, rel: string): void => {
    for (const entry of readdirSync(at, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      if (entry.name === GIT_DIR) continue
      const next = rel === "" ? entry.name : `${rel}/${entry.name}`
      if (entry.name === VENDOR_ROOT) {
        found.push(next)
        continue
      }
      walk(join(at, entry.name), next)
    }
  }
  walk(root, "")
  return found
}

function linkOne(from: string, into: string): number {
  mkdirSync(into, { recursive: true })
  let made = 0
  for (const entry of readdirSync(from)) {
    const held = join(from, entry)
    const landing = join(into, entry)
    if (entry.startsWith("@")) {
      mkdirSync(landing, { recursive: true })
      for (const inner of readdirSync(held)) {
        if (existsSync(join(landing, inner))) continue
        symlinkSync(join(held, inner), join(landing, inner))
        made += 1
      }
      continue
    }
    if (existsSync(landing)) continue
    symlinkSync(held, landing)
    made += 1
  }
  return made
}

function linkModulesInto(tree: string, root: string): number {
  let made = 0
  for (const rel of vendorDirs(root)) made += linkOne(join(root, rel), join(tree, rel))
  return made
}

function pageBody(seq: number, name: string, seat: string): string {
  return [
    "---",
    `id: ${crypto.randomUUID()}`,
    `page-type-slug: ${PAGE_TYPE}`,
    `seq: ${seq}`,
    `slug: ${name}`,
    `seat-slug: ${seat}`,
    "---",
    "",
  ].join("\n")
}

export default async function start(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) return
  rejectUnknownFlags(argv)

  const root = akashaRoot()
  const seat = seatSlug()
  const holding = holdingRoot()
  const from = valueOf(argv, FROM, MAIN)

  const at = ran(root, ["rev-parse", "--verify", "--quiet", `${from}^{commit}`])
  if (!at.ok) {
    fail(`${from} names no commit in akasha, so no seq was taken and nothing was made`)
  }

  const seq = takeSeqOf({
    pageTypeRelPath: pageTypePathIn(ownRepoRoot(), PAGE_TYPE),
    noun: "worktrees",
  })
  const name = `${PAGE_TYPE}-${seq}`
  const tree = join(holding, HOLDING, name)

  if (existsSync(tree)) {
    fail(`${tree} already exists, and seq ${seq} is spent with nothing made at it`)
  }

  const made = ran(root, ["worktree", "add", "-b", name, tree, from])
  if (!made.ok) {
    fail(`${name} was not created off ${from} and seq ${seq} stays taken:\n${made.said}`)
  }

  const links = linkModulesInto(tree, root)
  const relPath = `${placeDirOf(PAGE_TYPE)}/${name}.${PAGE_TYPE}.md`

  try {
    landFiles({
      repo: AKASHA,
      root,
      message: `worktrees: ${name} is started`,
      mechanical: true,
      entries: [{ relPath, body: pageBody(seq, name, seat) }],
    })
    handOffPush(root)
  } catch (thrown) {
    const said = thrown instanceof Error ? thrown.message : String(thrown)
    fail(
      `${name} and its tree stand at ${tree}, and its page did not land, so nothing reads the ` +
        `worktree. Take it away with \`ops worktree abandon ${name}\`:\n${said}`
    )
  }

  process.stdout.write(`${name}\t${tree}\n`)
  process.stderr.write(`links:  ${links} entr${links === 1 ? "y" : "ies"} linked into node_modules\n`)
}
