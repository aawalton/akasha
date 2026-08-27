export const summary = "Run akasha's checks over a worktree, as that worktree defines them"

import { existsSync } from "node:fs"
import { join } from "node:path"
import { placeDirOf } from "../../../page/page-types.ts"
import { landFiles } from "../../../repo/land/land.ts"
import { handOffPush } from "../../../repo/push/push.ts"
import { akashaRoot, rootsHere } from "../../../repo/roots/roots.ts"

const BARE_FLAGS = ["--help", "-h"]

const PAGE_TYPE = "worktree"

const MEMORY = "memory"

const PASSED = "passed-commit"

const RED = 4

const BRANCH_AT = "branch refs/heads/"

const WORKTREE_AT = "worktree "

const HEAD_AT = "HEAD "

export const help = {
  description:
    `${summary}.\n` +
    "\n" +
    "The checks that run are the ones the worktree itself defines, run by the worktree's own " +
    "code, because a change may be to a check and the point of asking is to hear what the change " +
    "says rather than what main said. Reading the tree through main's checks gives the answer " +
    "main would have given, which is the one answer that cannot be wrong about anything.\n" +
    "\n" +
    "Every check runs. Narrowing them to those a change reaches is not settled, and running more " +
    "than are needed is slow where running fewer than are needed is false.\n" +
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

interface Tree {
  readonly name: string
  readonly at: string
  readonly head: string
}

function fail(reason: string): never {
  process.stderr.write(`error: ${reason}\n`)
  process.exit(1)
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

function treesHere(root: string): readonly Tree[] {
  const listed = ran(root, ["worktree", "list", "--porcelain"])
  if (!listed.ok) fail(`git could not list akasha's worktrees:\n${listed.said}`)
  const trees: Tree[] = []
  let at: string | null = null
  let head = ""
  for (const line of listed.said.split("\n")) {
    if (line.startsWith(WORKTREE_AT)) {
      at = line.slice(WORKTREE_AT.length)
      head = ""
      continue
    }
    if (line.startsWith(HEAD_AT)) head = line.slice(HEAD_AT.length)
    if (!line.startsWith(BRANCH_AT) || at === null) continue
    trees.push({ name: line.slice(BRANCH_AT.length), at, head })
  }
  return trees
}

function standingIn(trees: readonly Tree[]): Tree {
  const here = ran(process.cwd(), ["rev-parse", "--show-toplevel"])
  const found = here.ok ? trees.find((one) => one.at === here.said) : undefined
  if (found === undefined) {
    fail(
      "this is no worktree of akasha, so there is nothing here to check — stand in one, or name " +
        "the one you mean"
    )
  }
  return found
}

function pageOf(memoryRoot: string, name: string): string {
  const relPath = `${placeDirOf(PAGE_TYPE)}/${name}.${PAGE_TYPE}.md`
  if (!existsSync(join(memoryRoot, relPath))) {
    fail(`no page states ${name}, so nothing says it is this system's worktree to check`)
  }
  return relPath
}

function runInTree(tree: Tree): number {
  const root = JSON.stringify(tree.at)
  const script =
    `const { checksFound } = await import(${JSON.stringify(`${tree.at}/checks/checks.ts`)})\n` +
    `const { runAudit, judgesAuthor } = await import(${JSON.stringify(`${tree.at}/checks/run/audit.ts`)})\n` +
    `const root = ${root}\n` +
    "const wanted = checksFound(root).filter((one) => !judgesAuthor(one))\n" +
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
  for (const token of argv) {
    if (token.startsWith("-") && !BARE_FLAGS.includes(token)) {
      fail(`${token} is not a flag this command takes — run it with --help`)
    }
  }

  const named = argv.filter((one) => !one.startsWith("-"))
  if (named.length > 1) fail("name one worktree or none, never several")

  const trees = treesHere(akashaRoot())
  const wanted = named[0]
  const found = wanted === undefined ? null : trees.find((one) => one.name === wanted)
  if (wanted !== undefined && found === undefined) {
    fail(`no worktree of akasha is called ${wanted}`)
  }
  const tree = found ?? standingIn(trees)

  const memoryRoot = rootsHere()[MEMORY]
  if (memoryRoot === undefined) fail("no memory repository is cloned here, so no page can be read")
  const relPath = pageOf(memoryRoot, tree.name)

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
    repo: MEMORY,
    root: memoryRoot,
    message: `worktrees: ${tree.name} passed at ${tree.head.slice(0, 7)}`,
    mechanical: true,
    composing: [{ relPath, compose: (standing) => stamped(standing, tree.head) }],
  })
  handOffPush(memoryRoot)
  process.stderr.write(`page:   ${PASSED} is ${tree.head.slice(0, 7)}\n`)
}
