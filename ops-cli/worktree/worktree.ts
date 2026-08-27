import { existsSync } from "node:fs"
import { join } from "node:path"
import { placeDirOf } from "../../page/page-types.ts"

export const PAGE_TYPE = "worktree"

export const MEMORY = "memory"

export const ORIGIN = "origin"

const BRANCH_AT = "branch refs/heads/"

const WORKTREE_AT = "worktree "

const HEAD_AT = "HEAD "

export interface Tree {
  readonly name: string
  readonly at: string
  readonly head: string
}

export interface Said {
  readonly ok: boolean
  readonly said: string
}

export function fail(reason: string): never {
  process.stderr.write(`error: ${reason}\n`)
  process.exit(1)
}

export function ran(root: string, args: readonly string[]): Said {
  const proc = Bun.spawnSync(["git", "-C", root, ...args], { stdout: "pipe", stderr: "pipe" })
  const decode = (raw: Uint8Array | null): string =>
    raw === null ? "" : new TextDecoder().decode(raw)
  return {
    ok: (proc.exitCode ?? 1) === 0,
    said: `${decode(proc.stdout)}${decode(proc.stderr)}`.trim(),
  }
}

export function treesHere(root: string): readonly Tree[] {
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

export function treeAtCwd(trees: readonly Tree[]): Tree | null {
  const here = ran(process.cwd(), ["rev-parse", "--show-toplevel"])
  if (!here.ok) return null
  return trees.find((one) => one.at === here.said) ?? null
}

export function pageRelOf(name: string): string {
  return `${placeDirOf(PAGE_TYPE)}/${name}.${PAGE_TYPE}.md`
}

export function pageOf(memoryRoot: string, name: string): string {
  const relPath = pageRelOf(name)
  if (!existsSync(join(memoryRoot, relPath))) {
    fail(`no page states ${name}, so nothing says it is this system's worktree`)
  }
  return relPath
}

export function onOrigin(root: string, name: string): boolean {
  const listed = ran(root, ["ls-remote", "--heads", ORIGIN, name])
  return listed.ok && listed.said !== ""
}

export function takeTreeAway(root: string, tree: Tree, remote: boolean): readonly string[] {
  const left: string[] = []
  if (existsSync(tree.at) && !ran(root, ["worktree", "remove", "--force", tree.at]).ok) {
    left.push(`its tree at ${tree.at}`)
  }
  const stands = ran(root, ["rev-parse", "--verify", "--quiet", `refs/heads/${tree.name}`]).ok
  if (stands && !ran(root, ["branch", "-D", tree.name]).ok) left.push(`the branch ${tree.name}`)
  if (remote && !ran(root, ["push", ORIGIN, "--delete", tree.name]).ok) {
    left.push(`${ORIGIN}/${tree.name}`)
  }
  return left
}

export function rejectUnknownFlags(argv: readonly string[], known: readonly string[]): void {
  for (const token of argv) {
    if (!token.startsWith("-")) continue
    if (known.includes(token)) continue
    fail(`${token} is not a flag this command takes — run it with --help`)
  }
}
