import { cpSync, existsSync, mkdirSync, readdirSync, realpathSync, symlinkSync } from "node:fs"
import { dirname, isAbsolute, join, relative } from "node:path"
import { CARRIED } from "@akasha/code-system/code-tests"
import { scratchWorld } from "@akasha/command-system/scratching"
import { told } from "@akasha/git/git-running"
import { indexNamed } from "@akasha/indexes"
import { headOf } from "@akasha/indexes/stamp"

const PREFIX = "akasha-differing-"

const INSIDE = "akasha"

const MODULES = "node_modules"

const SCOPE = "@"

const AT_HEAD = "HEAD"

const UP = ".."

const ALSO: readonly string[] = ["bun.lock", "bunfig.toml"]

export type Tree = {
  readonly root: string
  readonly head: string | null
  readonly sweep: () => undefined
}

function carriedInto(from: string, root: string): undefined {
  for (const one of [...CARRIED, ...ALSO]) {
    const at = join(from, one)
    if (existsSync(at)) cpSync(at, join(root, one))
  }
  return undefined
}

export function insideAkasha(from: string, at: string): string | null {
  if (!existsSync(at)) return null
  const said = relative(join(realpathSync(from), INSIDE), realpathSync(at))
  if (said === "" || said.startsWith(UP) || isAbsolute(said)) return null
  return join(INSIDE, said)
}

function linkedInto(from: string, root: string, at: string, to: string): undefined {
  const inside = insideAkasha(from, at)
  symlinkSync(inside === null ? at : join(root, inside), to)
  return undefined
}

function modulesInto(from: string, root: string): undefined {
  const live = join(from, MODULES)
  if (!existsSync(live)) return undefined
  const at = join(root, MODULES)
  mkdirSync(at, { recursive: true })
  for (const one of readdirSync(live)) {
    if (!one.startsWith(SCOPE)) {
      linkedInto(from, root, join(live, one), join(at, one))
      continue
    }
    mkdirSync(join(at, one), { recursive: true })
    for (const member of readdirSync(join(live, one))) {
      linkedInto(from, root, join(live, one, member), join(at, one, member))
    }
  }
  return undefined
}

function indexInto(from: string, root: string): undefined {
  const named = indexNamed()
  const at = join(from, named)
  if (!existsSync(at)) return undefined
  const to = join(root, named)
  mkdirSync(dirname(to), { recursive: true })
  cpSync(at, to, { recursive: true })
  return undefined
}

export function treeFrom(from: string): Tree {
  const scratch = scratchWorld()
  const root = scratch.rootFor(PREFIX)
  const head = headOf(from)
  told(root, ["clone", "--shared", "--no-checkout", "--quiet", from, "."])
  if (head !== null) told(root, ["update-ref", "--no-deref", AT_HEAD, head])
  indexInto(from, root)
  cpSync(join(from, INSIDE), join(root, INSIDE), { recursive: true, verbatimSymlinks: true })
  carriedInto(from, root)
  modulesInto(from, root)
  return { root, head, sweep: scratch.sweep }
}
