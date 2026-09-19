import { existsSync, mkdirSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import {
  dataError,
  inputError,
} from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"

const PROJECTS = "projects"

const TREE = "tree"

const LAID = "laid"

const NODE_MODULES = "node_modules"

const AKASHA = "akasha"

const BIN = ".bin"

const HIDDEN = "."

export function commitNamed(root: string, said: string): string {
  const done = ran(["git", "rev-parse", "--verify", "--quiet", `${said}^{commit}`], { cwd: root })
  const read = done.out.trim()
  if (done.code !== 0 || read === "") {
    throw inputError(`\`${said}\` names no commit in this repository`)
  }
  return read
}

export function commitDir(commit: string): string {
  return join(homedir(), PROJECTS, commit)
}

export function treePath(commit: string): string {
  return join(commitDir(commit), TREE)
}

function laidMark(commit: string): string {
  return join(commitDir(commit), LAID)
}

function linkPackages(root: string, tree: string): undefined {
  const from = join(root, NODE_MODULES)
  const at = join(tree, NODE_MODULES)
  rmSync(at, { recursive: true, force: true })
  mkdirSync(at, { recursive: true })
  for (const one of readdirSync(from)) {
    if (one === AKASHA) continue
    if (one.startsWith(HIDDEN) && one !== BIN) continue
    symlinkSync(join(from, one), join(at, one))
  }
  symlinkSync(tree, join(at, AKASHA))
}

const LAY_DOWN = 'git archive --format=tar "$1" | tar -x -C "$2"'

const HOLD = 'find "$1" -type f -exec chmod a-w {} +'

export function treeLaidDown(root: string, commit: string): string {
  const at = treePath(commit)
  if (existsSync(laidMark(commit))) return at
  rmSync(at, { recursive: true, force: true })
  mkdirSync(at, { recursive: true })
  const done = ran(["sh", "-c", LAY_DOWN, "sh", commit, at], { cwd: root })
  if (done.code !== 0) {
    rmSync(at, { recursive: true, force: true })
    throw dataError(`the tree of ${commit} could not be laid down at ${at} — ${done.err.trim()}`)
  }
  const held = ran(["sh", "-c", HOLD, "sh", at])
  if (held.code !== 0) {
    rmSync(at, { recursive: true, force: true })
    throw dataError(`the tree at ${at} could not be held still — ${held.err.trim()}`)
  }
  linkPackages(root, at)
  writeFileSync(laidMark(commit), `${commit}\n`, { mode: 0o600 })
  return at
}

export function treeTakenAway(commit: string): undefined {
  rmSync(commitDir(commit), { recursive: true, force: true })
}
