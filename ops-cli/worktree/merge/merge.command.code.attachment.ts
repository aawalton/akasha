export const summary = "Land a worktree whose checks passed on main, and take the tree away"

import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { parseFrontmatter, textField } from "../../../page/frontmatter.ts"
import { landFiles } from "../../../repo/land/land.ts"
import { handOffPush } from "../../../repo/push/push.ts"
import { AKASHA, akashaRoot } from "@akasha/pages-system/checkout-roots"
import {
  fail,
  onOrigin,
  pageOf,
  ran,
  rejectUnknownFlags,
  takeTreeAway,
  treeAtCwd,
  treesHere,
} from "../worktree.ts"

const KNOWN = ["--help", "-h"]

const MAIN = "main"

const PASSED = "passed-commit"

const LOCKFILE = "bun.lock"

export const help = {
  positionals: [
    { name: "name", description: "The worktree to land. Required where you stand in one." },
  ],
}

function passedAt(root: string, relPath: string): string | null {
  const body = readFileSync(join(root, relPath), "utf8")
  return textField(parseFrontmatter(body), PASSED)
}

export default async function merge(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) return
  rejectUnknownFlags(argv, KNOWN)

  const root = akashaRoot()
  const named = argv.filter((one) => !one.startsWith("-"))
  if (named.length > 1) fail("name one worktree or none, never several")

  const trees = treesHere(root)
  const here = treeAtCwd(trees)
  const wanted = named[0]

  if (wanted === undefined) {
    if (here === null) fail("name the worktree to land — this is not one")
    fail(
      `you are standing in ${here.name}, and a merge takes its tree away — run ` +
        `\`ops worktree merge ${here.name}\` from somewhere else`
    )
  }

  const tree = trees.find((one) => one.name === wanted)
  if (tree === undefined) fail(`no worktree of akasha is called ${wanted}`)
  if (here !== null && here.name === tree.name) {
    fail(`you are standing in ${tree.name}, and a merge takes its tree away — run this elsewhere`)
  }

  const relPath = pageOf(root, tree.name)

  const dirty = ran(tree.at, ["status", "--porcelain", "--untracked-files=all"])
  if (!dirty.ok) fail(`nothing is known about what ${tree.name} holds, so nothing was merged`)
  if (dirty.said !== "") {
    fail(`${tree.name} holds uncommitted work, so what would land is not what stands there`)
  }

  const passed = passedAt(root, relPath)
  if (passed === null) {
    fail(`${tree.name} has no checks that passed — run \`ops worktree check ${tree.name}\` first`)
  }
  if (passed !== tree.head) {
    fail(
      `${tree.name} stands at ${tree.head.slice(0, 7)} and its checks passed at ` +
        `${passed.slice(0, 7)}, so the commit that passed is not the one that would land — run ` +
        `\`ops worktree check ${tree.name}\` again`
    )
  }

  const branch = ran(root, ["rev-parse", "--abbrev-ref", "HEAD"])
  if (!branch.ok || branch.said !== MAIN) {
    fail(`akasha stands on ${branch.said}, and a worktree lands on ${MAIN}`)
  }

  const folded = ran(root, ["merge", "--no-ff", "--no-edit", "-m", `merge ${tree.name}`, tree.name])
  if (!folded.ok) {
    ran(root, ["merge", "--abort"])
    fail(`${tree.name} conflicts with ${MAIN} as it stands, so nothing landed:\n${folded.said}`)
  }

  const pushed = ran(root, ["push", "origin", MAIN])
  if (!pushed.ok) {
    fail(
      `${tree.name} is folded into ${MAIN} here and the push was refused, so the commit stands ` +
        `only on this machine and the tree is kept:\n${pushed.said}`
    )
  }

  if (existsSync(join(root, LOCKFILE))) {
    const linked = Bun.spawnSync([process.execPath, "install", "--frozen-lockfile"], {
      cwd: root,
      stdout: "pipe",
      stderr: "pipe",
    })
    if ((linked.exitCode ?? 1) !== 0) {
      fail(
        `${tree.name} landed on ${MAIN} and was pushed, and linking this checkout's packages ` +
          "failed, so the tree is kept. Put the checkout right and run this again, which folds " +
          "onto a main that already holds the commit and takes the tree away then"
      )
    }
  }

  const left = takeTreeAway(root, tree, onOrigin(root, tree.name))
  if (left.length > 0) {
    fail(
      `${tree.name} landed on ${MAIN} and its page is kept, so what is left can still be ` +
        `reached. Standing yet: ${left.join(", ")}`
    )
  }

  landFiles({
    repo: AKASHA,
    root,
    message: `worktrees: ${tree.name} is merged`,
    mechanical: true,
    removing: [relPath],
  })
  handOffPush(root)

  const at = ran(root, ["rev-parse", "--short", "HEAD"])
  process.stderr.write(`merged: ${tree.name} into ${MAIN} at ${at.said}, and the tree is gone\n`)
}
