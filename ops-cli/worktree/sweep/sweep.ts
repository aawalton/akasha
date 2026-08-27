export const summary = "Take away every worktree of akasha no seat is working in"

import { existsSync } from "node:fs"
import { landFiles } from "../../../repo/land/land.ts"
import { handOffPush } from "../../../repo/push/push.ts"
import { akashaRoot, rootsHere } from "../../../repo/roots/roots.ts"
import {
  type Claimed,
  everyTreeHere,
  fail,
  MEMORY,
  namesPaged,
  pageRelOf,
  ran,
  rejectUnknownFlags,
} from "../worktree.ts"

const DRY_RUN = "--dry-run"

const KNOWN = [DRY_RUN, "--help", "-h"]

const MAIN = "main"

const UNLANDED = "+ "

const LEFT_STANDING = 3

export const help = {
  description:
    `${summary}.\n` +
    "\n" +
    "A WORKTREE THIS SYSTEM MADE HAS A PAGE, so a tree akasha claims that no page names is one no " +
    "seat is working in: either something other than `ops worktree start` made it, or its page " +
    "went while it did not. A page naming no tree akasha claims is the same disagreement the " +
    "other way round, and both are read here.\n" +
    "\n" +
    "WHAT IS READ IS EVERY TREE AKASHA CLAIMS, never a directory's children. `~/worktrees` also " +
    "holds trees of other repositories that are live and worked in, and a sweep keyed on what " +
    "sits there would take one of those away.\n" +
    "\n" +
    "WORK IS NEVER SWEPT. A tree holding uncommitted changes, or commits that never landed, is " +
    "reported and kept, because nothing named it and so nothing chose to give it up. Giving up " +
    "work is what `ops worktree abandon` does, and that is a seat's own act.\n" +
    "\n" +
    "Anything kept leaves this exiting 3, the sweep having read a worktree it could not put right.",
  flags: [{ name: DRY_RUN, description: "Read everything, report it, and take nothing away." }],
}

interface Stale {
  readonly tree: Claimed
  readonly there: boolean
  readonly holds: string
  readonly unlanded: readonly string[]
  readonly underfoot: boolean
}

interface Orphan {
  readonly name: string
  readonly branch: boolean
  readonly unlanded: readonly string[]
}

function unlandedIn(root: string, at: string): readonly string[] {
  const cherry = ran(root, ["cherry", MAIN, at])
  if (!cherry.ok) return []
  return cherry.said
    .split("\n")
    .filter((line) => line.startsWith(UNLANDED))
    .map((line) => line.slice(UNLANDED.length).trim())
}

function saidOf(root: string, commit: string): string {
  const shown = ran(root, ["log", "-1", "--format=%h %s", commit])
  return shown.ok ? shown.said : commit
}

function holdsOf(at: string, there: boolean): string {
  if (!there) return ""
  const held = ran(at, ["status", "--porcelain", "--untracked-files=all"])
  return held.ok ? held.said : "git could not say what it holds"
}

function keptFor(one: Stale): string | null {
  if (one.underfoot) return "the caller is standing in it"
  if (one.holds !== "") return "it holds work written down nowhere else"
  if (one.unlanded.length > 0) return `it holds ${one.unlanded.length} commit(s) that never landed`
  return null
}

export default async function sweep(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) return
  rejectUnknownFlags(argv, KNOWN)
  if (argv.some((one) => !one.startsWith("-"))) {
    fail("this names no worktree — it reads every one akasha claims")
  }

  const root = akashaRoot()
  const memoryRoot = rootsHere()[MEMORY]
  if (memoryRoot === undefined) fail("no memory repository is cloned here, so no page can be read")

  const claimed = everyTreeHere(root)
  const own = claimed[0]
  if (own === undefined) fail("git claims no worktree of akasha, not even its own checkout")

  const paged = namesPaged(memoryRoot)
  const here = ran(process.cwd(), ["rev-parse", "--show-toplevel"])
  const standing = here.ok ? here.said : null

  const stale: readonly Stale[] = claimed
    .filter((one) => one.at !== own.at)
    .filter((one) => one.name === null || !paged.includes(one.name))
    .map((one) => {
      const there = existsSync(one.at)
      return {
        tree: one,
        there,
        holds: holdsOf(one.at, there),
        unlanded: unlandedIn(root, one.name ?? one.head),
        underfoot: standing !== null && one.at === standing,
      }
    })

  const orphans: readonly Orphan[] = paged
    .filter((name) => !claimed.some((one) => one.name === name))
    .map((name) => {
      const branch = ran(root, ["rev-parse", "--verify", "--quiet", `refs/heads/${name}`]).ok
      return { name, branch, unlanded: branch ? unlandedIn(root, name) : [] }
    })

  if (stale.length === 0 && orphans.length === 0) {
    process.stderr.write("clean:  every worktree akasha claims has a page, and every page a tree\n")
    return
  }

  const lines: string[] = []
  for (const one of stale) {
    const named = one.tree.name ?? "no branch of its own"
    const missing = one.there ? "" : ", its tree gone from disk"
    lines.push(`no page:  ${one.tree.at}`)
    lines.push(`          ${named} at ${one.tree.head.slice(0, 7)}${missing}`)
    for (const line of one.holds === "" ? [] : one.holds.split("\n")) {
      lines.push(`  holds:    ${line}`)
    }
    for (const commit of one.unlanded) lines.push(`  unlanded: ${saidOf(root, commit)}`)
  }
  for (const one of orphans) {
    lines.push(`no tree:  ${pageRelOf(one.name)}`)
    for (const commit of one.unlanded) lines.push(`  unlanded: ${saidOf(root, commit)}`)
  }
  process.stderr.write(`${lines.join("\n")}\n`)

  if (argv.includes(DRY_RUN)) {
    process.stderr.write("dry-run: nothing was taken away\n")
    return
  }

  const kept = stale.filter((one) => keptFor(one) !== null)
  const going = stale.filter((one) => keptFor(one) === null)
  const keptPages = orphans.filter((one) => one.unlanded.length > 0)
  const dropping = orphans.filter((one) => one.unlanded.length === 0)

  const left: string[] = []
  for (const one of going) {
    if (one.there && !ran(root, ["worktree", "remove", "--force", one.tree.at]).ok) {
      left.push(`its tree at ${one.tree.at}`)
      continue
    }
    const name = one.tree.name
    if (name === null) continue
    if (!ran(root, ["rev-parse", "--verify", "--quiet", `refs/heads/${name}`]).ok) continue
    if (!ran(root, ["branch", "-D", name]).ok) left.push(`the branch ${name}`)
  }
  for (const one of dropping) {
    if (!one.branch) continue
    if (!ran(root, ["branch", "-D", one.name]).ok) left.push(`the branch ${one.name}`)
  }
  ran(root, ["worktree", "prune"])

  if (dropping.length > 0) {
    landFiles({
      repo: MEMORY,
      root: memoryRoot,
      message: `worktrees: ${dropping.length} page(s) name no tree akasha claims`,
      mechanical: true,
      removing: dropping.map((one) => pageRelOf(one.name)),
    })
    handOffPush(memoryRoot)
  }

  if (going.length > 0 || dropping.length > 0) {
    process.stderr.write(`gone:   ${going.length} tree(s), ${dropping.length} page(s)\n`)
  }
  for (const one of kept) process.stderr.write(`kept:   ${one.tree.at} — ${keptFor(one)}\n`)
  for (const one of keptPages) {
    const many = `${one.unlanded.length} commit(s) that never landed`
    process.stderr.write(`kept:   ${pageRelOf(one.name)} — its branch holds ${many}\n`)
  }

  if (left.length > 0) fail(`a sweep could not take away: ${left.join(", ")}`)
  if (kept.length > 0 || keptPages.length > 0) process.exit(LEFT_STANDING)
}
