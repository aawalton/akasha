export const summary = "Give up a worktree, leaving no tree, branch or page behind"

import { existsSync } from "node:fs"
import { join } from "node:path"
import { landFiles } from "../../../repo/land/land.ts"
import { handOffPush } from "../../../repo/push/push.ts"
import { akashaRoot, rootsHere } from "../../../repo/roots/roots.ts"
import {
  fail,
  MEMORY,
  pageOf,
  ran,
  rejectUnknownFlags,
  type Tree,
  treeAtCwd,
  treesHere,
} from "../worktree.ts"

const DRY_RUN = "--dry-run"

const KNOWN = [DRY_RUN, "--help", "-h"]

const MAIN = "main"

const ORIGIN = "origin"

const UNLANDED = "+ "

export const help = {
  description:
    `${summary}.\n` +
    "\n" +
    "EVERY READING HAPPENS BEFORE ANY ACT, so the first refusal leaves the worktree exactly as " +
    "it was. What is read is printed either way, so a dry run and a refusal show the same thing.\n" +
    "\n" +
    "UNCOMMITTED WORK IS NEVER GIVEN UP. A tree holding changes of its own, tracked or not, is " +
    "refused, because that work has no other copy anywhere. A commit that never landed is a " +
    "different thing: it was written down, this prints every one of them, and then drops them, " +
    "which is what giving up a worktree means.\n" +
    "\n" +
    "Landedness is read with `git cherry` rather than by ancestry, so a commit that landed as a " +
    "cherry-pick or through a rebase reads as landed rather than as work about to be lost.\n" +
    "\n" +
    "The page goes last and only where nothing else is left standing. A page removed while its " +
    "tree or branch survives is a worktree nothing states, which nothing can then finish.",
  positionals: [
    { name: "name", description: "The worktree to give up. Required where you stand in one." },
  ],
  flags: [{ name: DRY_RUN, description: "Read everything, report it, and take nothing away." }],
}

function unlandedIn(root: string, tree: Tree): readonly string[] {
  const cherry = ran(root, ["cherry", MAIN, tree.name])
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

export default async function abandon(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) return
  rejectUnknownFlags(argv, KNOWN)

  const root = akashaRoot()
  const named = argv.filter((one) => !one.startsWith("-"))
  if (named.length > 1) fail("name one worktree or none, never several")

  const trees = treesHere(root)
  const here = treeAtCwd(trees)
  const wanted = named[0]

  if (wanted === undefined) {
    if (here === null) fail("name the worktree to give up — this is not one")
    fail(
      `you are standing in ${here.name}, and a tree cannot take away the ground its caller ` +
        `stands on — run \`ops worktree abandon ${here.name}\` from somewhere else`
    )
  }

  const tree = trees.find((one) => one.name === wanted)
  if (tree === undefined) fail(`no worktree of akasha is called ${wanted}`)
  if (here !== null && here.name === tree.name) {
    fail(
      `you are standing in ${tree.name}, and a tree cannot take away the ground its caller ` +
        "stands on — run this from somewhere else"
    )
  }

  const memoryRoot = rootsHere()[MEMORY]
  if (memoryRoot === undefined) fail("no memory repository is cloned here, so no page can be read")
  const relPath = pageOf(memoryRoot, tree.name)

  const dirty = ran(tree.at, ["status", "--porcelain", "--untracked-files=all"])
  if (!dirty.ok) fail(`nothing is known about what ${tree.name} holds, so nothing was taken away`)

  const unlanded = unlandedIn(root, tree)
  const onOrigin = ran(root, ["ls-remote", "--heads", ORIGIN, tree.name])
  const remote = onOrigin.ok && onOrigin.said !== ""

  const lines = [
    `worktree:  ${tree.at}`,
    `branch:    ${tree.name} at ${tree.head.slice(0, 7)}`,
    `origin:    ${remote ? `${ORIGIN}/${tree.name}` : "nothing pushed"}`,
    `page:      ${relPath}`,
    ...unlanded.map((one) => `unlanded:  ${saidOf(root, one)}`),
  ]
  process.stderr.write(`${lines.join("\n")}\n`)

  if (dirty.said !== "") {
    fail(
      `${tree.name} holds work written down nowhere else, so nothing was taken away:\n` +
        dirty.said
          .split("\n")
          .map((one) => `  ${one}`)
          .join("\n")
    )
  }

  if (argv.includes(DRY_RUN)) {
    process.stderr.write("dry-run: nothing was taken away\n")
    return
  }

  const left: string[] = []

  if (existsSync(tree.at)) {
    const gone = ran(root, ["worktree", "remove", "--force", tree.at])
    if (!gone.ok) left.push(`its tree at ${tree.at}`)
  }

  if (ran(root, ["rev-parse", "--verify", "--quiet", `refs/heads/${tree.name}`]).ok) {
    if (!ran(root, ["branch", "-D", tree.name]).ok) left.push(`the branch ${tree.name}`)
  }

  if (remote && !ran(root, ["push", ORIGIN, "--delete", tree.name]).ok) {
    left.push(`${ORIGIN}/${tree.name}`)
  }

  if (left.length > 0) {
    fail(
      `${tree.name} is partly gone and its page is kept, so what is left can still be reached. ` +
        `Standing yet: ${left.join(", ")}`
    )
  }

  landFiles({
    repo: MEMORY,
    root: memoryRoot,
    message: `worktrees: ${tree.name} is abandoned`,
    mechanical: true,
    removing: [relPath],
  })
  handOffPush(memoryRoot)

  const dropped = unlanded.length === 0 ? "" : `, ${unlanded.length} unlanded commit(s) dropped`
  process.stderr.write(`gone:   ${tree.name} — tree, branch and page${dropped}\n`)
}
