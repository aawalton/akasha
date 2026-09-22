import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { GIT_AT, TREE_INDEXES, TREES } from "akasha/file/modules/git-place/git-place.module.code.ts"
import { gitDirIn } from "akasha/git/modules/dir/git-dir.module.code.ts"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"

export const PINNED_AT = ".pinned-commit"

const BEING_WRITTEN = ".being-written"

const AN_INDEX = "index"

const NAMES_A_DIR = "gitdir: "

export type Pinned = { readonly at: string } | { readonly refused: string }

export function treeIn(root: string, kind: string): string | null {
  const dir = gitDirIn(root)
  return dir === null ? null : join(dir, TREES, kind)
}

export function stampIn(at: string): string {
  return join(at, PINNED_AT)
}

export function saidOfNoTree(kind: string, why: string): string {
  return `\`${kind}\` is built from a tree pinned at the commit, and ${why}`
}

function dirNamedIn(at: string): string | null {
  let held: string
  try {
    held = readFileSync(join(at, GIT_AT), "utf8")
  } catch {
    return null
  }
  const one = held.trim()
  return one.startsWith(NAMES_A_DIR) ? one.slice(NAMES_A_DIR.length).trim() : null
}

function takenOutOfGit(root: string, at: string, index: string): undefined {
  const inside = join(at, GIT_AT)
  if (!existsSync(inside)) return undefined
  const kept = dirNamedIn(at)
  if (kept !== null && !existsSync(index)) {
    try {
      copyFileSync(join(kept, AN_INDEX), index)
    } catch {}
  }
  rmSync(inside, { recursive: true, force: true })
  told(root, ["worktree", "prune", "--expire=now"])
  return undefined
}

function movedTree(gitDir: string, at: string, index: string, commit: string): boolean {
  const done = ran(
    ["git", `--git-dir=${gitDir}`, `--work-tree=${at}`, "read-tree", "--reset", "-u", commit],
    { cwd: at, env: { ...process.env, GIT_INDEX_FILE: index } }
  )
  return done.code === 0
}

function stamped(at: string, commit: string): boolean {
  const stamp = stampIn(at)
  const being = `${stamp}${BEING_WRITTEN}`
  try {
    writeFileSync(being, `${commit}\n`)
    renameSync(being, stamp)
    return true
  } catch {
    return false
  }
}

export function pinnedTree(root: string, kind: string, commit: string): Pinned {
  const gitDir = gitDirIn(root)
  if (gitDir === null) return { refused: saidOfNoTree(kind, `git names no folder under ${root}`) }
  const at = join(gitDir, TREES, kind)
  const index = join(gitDir, TREE_INDEXES, kind)
  mkdirSync(at, { recursive: true })
  mkdirSync(dirname(index), { recursive: true })
  takenOutOfGit(root, at, index)
  if (!movedTree(gitDir, at, index, commit)) {
    return {
      refused: saidOfNoTree(kind, `the tree at ${at} would not be written out at ${commit}`),
    }
  }
  if (!stamped(at, commit)) {
    return { refused: saidOfNoTree(kind, `${commit} would not be written into ${stampIn(at)}`) }
  }
  return { at }
}
