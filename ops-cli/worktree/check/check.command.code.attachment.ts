export const summary = "Run akasha's checks over a worktree, as that worktree defines them"

import { landFiles } from "../../../repo/land/land.ts"
import { handOffPush } from "../../../repo/push/push.ts"
import { AKASHA, akashaRoot } from "../../../repo/roots/roots.ts"
import {
  fail,
  pageOf,
  ran,
  rejectUnknownFlags,
  type Tree,
  treeAtCwd,
  treesHere,
} from "../worktree.ts"

const KNOWN = ["--help", "-h"]

const PASSED = "passed-commit"

const RED = 4

export const help = {
  description:
    `${summary}.\n` +
    "\n" +
    "The checks that run are the ones the worktree itself defines, run by the worktree's own " +
    "code, because a change may be to a check and the point of asking is to hear what the change " +
    "says rather than what main said. Reading the tree through main's checks gives the answer " +
    "main would have given, which is the one answer that cannot be wrong about anything.\n" +
    "\n" +
    "Every check that states it runs on a worktree runs, whatever the change reaches. Narrowing " +
    "them to those a change reaches is not settled, and running more than are needed is slow " +
    "where running fewer than are needed is false.\n" +
    "\n" +
    "A tree that comes back green has its commit written onto its page. A tree holding " +
    "uncommitted work is judged as it stands on disk and nothing is written down, there being no " +
    "commit the answer belongs to.",
  positionals: [
    {
      name: "name",
      description: "The worktree to check. The one the caller stands in where none is named.",
    },
  ],
  exits: [
    { code: 0, meaning: "every check passed" },
    { code: RED, meaning: "a check failed" },
  ],
}

function runInTree(tree: Tree): number {
  const root = JSON.stringify(tree.at)
  const script =
    `const { checksOnWorktree } = await import(${JSON.stringify(`${tree.at}/checks-system/checks.ts`)})\n` +
    `const { runAudit } = await import(${JSON.stringify(`${tree.at}/checks-system/run/audit.ts`)})\n` +
    `const root = ${root}\n` +
    "const wanted = checksOnWorktree(root)\n" +
    "let found = 0\n" +
    "for (const run of runAudit(wanted, root)) {\n" +
    "  if ('threw' in run) { console.log(run.slug + '  threw  ' + run.threw); found += 1; continue }\n" +
    "  if (run.failures.length === 0) continue\n" +
    "  console.log(run.slug + '  ' + run.failures.length)\n" +
    "  for (const one of run.failures) {\n" +
    "    const at = one.path.startsWith(root + '/') ? one.path.slice(root.length + 1) : one.path\n" +
    "    console.log('    ' + at + '  ' + one.reason)\n" +
    "  }\n" +
    "  found += run.failures.length\n" +
    "}\n" +
    "console.log(found === 0 ? 'green' : found + ' failure(s)')\n" +
    "process.exit(found === 0 ? 0 : 1)\n"
  const proc = Bun.spawnSync([process.execPath, "-e", script], {
    cwd: tree.at,
    stdout: "inherit",
    stderr: "inherit",
    env: { ...process.env },
  })
  return proc.exitCode ?? 1
}

function stamped(standing: string | null, head: string): string {
  if (standing === null) throw new Error("the page is not there to write on")
  const line = `${PASSED}: ${head}`
  const held = new RegExp(`^${PASSED}: .*$`, "m")
  if (held.test(standing)) return standing.replace(held, line)
  const at = standing.indexOf("\n---", 3)
  if (at === -1) throw new Error("the page states no frontmatter to write into")
  return `${standing.slice(0, at)}\n${line}${standing.slice(at)}`
}

export default async function check(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) return
  rejectUnknownFlags(argv, KNOWN)

  const named = argv.filter((one) => !one.startsWith("-"))
  if (named.length > 1) fail("name one worktree or none, never several")

  const root = akashaRoot()
  const trees = treesHere(root)
  const wanted = named[0]
  const found = wanted === undefined ? null : trees.find((one) => one.name === wanted)
  if (wanted !== undefined && found === undefined) {
    fail(`no worktree of akasha is called ${wanted}`)
  }
  const tree: Tree | null = found ?? treeAtCwd(trees)
  if (tree === null) {
    fail(
      "this is no worktree of akasha, so there is nothing here to check — stand in one, or name " +
        "the one you mean"
    )
  }

  const relPath = pageOf(root, tree.name)

  process.stderr.write(`check:  ${tree.name} at ${tree.at}\n`)
  if (runInTree(tree) !== 0) process.exit(RED)

  const dirty = ran(tree.at, ["status", "--porcelain", "--untracked-files=all"])
  if (!dirty.ok) fail(`nothing is known about what ${tree.name} holds:\n${dirty.said}`)
  if (dirty.said !== "") {
    process.stderr.write(
      `page:   nothing written — ${tree.name} holds uncommitted work, so the answer belongs to ` +
        "no commit\n"
    )
    return
  }

  landFiles({
    repo: AKASHA,
    root,
    message: `worktrees: ${tree.name} passed at ${tree.head.slice(0, 7)}`,
    mechanical: true,
    composing: [{ relPath, compose: (standing) => stamped(standing, tree.head) }],
  })
  handOffPush(root)
  process.stderr.write(`page:   ${PASSED} is ${tree.head.slice(0, 7)}\n`)
}
