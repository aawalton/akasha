import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, join, relative } from "node:path"
import { textIn, textOf } from "@akasha/code/body-text"
import { ran } from "@akasha/utils/run/running"
import { pathsOf } from "../../../changes/modules/answer/change-answer.module.code.ts"
import type {
  Adding,
  FileChange,
  Moving,
  Removing,
  Replacing,
} from "../../../changes/modules/answer/change-answer.module.types.ts"
import { argvFor } from "../../../git/running/git-running.module.code.ts"

const MANIFEST = "package.json"

const LOCK = "bun.lock"

const PARTED_BY = "/"

const SCRATCH_AT = "/var/tmp"

const PREFIX = "akasha-manifest-locking-"

const ARCHIVE = "tracked.tar"

const TREE = "tree"

const TRACKED = [`:(glob)**/${MANIFEST}`, MANIFEST, LOCK]

const TAR = "tar"

const BUN = "bun"

const LOCKFILE_ONLY = ["install", "--lockfile-only"]

const INSTALL = ["install"]

const MODULES = "node_modules"

export const LOCKING_SPELLING =
  `the lockfile is made again from the manifests the base commit tracks with this change worked ` +
  `into them, so a change touching no \`${MANIFEST}\` is left alone and a change carrying its own ` +
  `\`${LOCK}\` is taken at its word`

function isManifest(path: string): boolean {
  return path === MANIFEST || path.endsWith(`${PARTED_BY}${MANIFEST}`)
}

type Bodied = Adding | Replacing | Removing

export function manifestsIn(changes: readonly FileChange[]): readonly Bodied[] {
  return changes.filter((one): one is Bodied => one.kind !== "move" && isManifest(one.path))
}

export function manifestMovesIn(changes: readonly FileChange[]): readonly Moving[] {
  return changes.filter(
    (one): one is Moving =>
      one.kind === "move" && (isManifest(one.pathFrom) || isManifest(one.pathTo))
  )
}

export function carriesLock(changes: readonly FileChange[]): boolean {
  return changes.some((one) => one.kind !== "move" && one.path === LOCK)
}

export function sameBytes(one: Uint8Array | null, other: Uint8Array | null): boolean {
  if (one === null || other === null) return one === other
  if (one.length !== other.length) return false
  return one.every((byte, at) => byte === other[at])
}

export type Made = { readonly was: Uint8Array | null; readonly now: Uint8Array } | null

export function lockedOver(
  root: string,
  base: string,
  touched: readonly Bodied[],
  moved: readonly Moving[] = []
): Made {
  const held = mkdtempSync(join(SCRATCH_AT, PREFIX))
  try {
    const archive = join(held, ARCHIVE)
    const tree = join(held, TREE)
    mkdirSync(tree)
    const took = ran(
      argvFor(root, ["archive", "--format=tar", "-o", archive, base, "--", ...TRACKED])
    )
    if (took.code !== 0) return null
    if (ran([TAR, "-xf", archive, "-C", tree]).code !== 0) return null
    const at = join(tree, LOCK)
    let was: Uint8Array | null = null
    try {
      was = readFileSync(at)
    } catch {
      was = null
    }
    for (const one of moved) {
      const from = join(tree, one.pathFrom)
      if (!existsSync(from)) continue
      const landed = join(tree, one.pathTo)
      mkdirSync(dirname(landed), { recursive: true })
      renameSync(from, landed)
    }
    for (const one of touched) {
      const to = join(tree, one.path)
      if (one.kind === "remove") {
        rmSync(to, { force: true })
        continue
      }
      mkdirSync(dirname(to), { recursive: true })
      writeFileSync(to, one.kind === "add" ? one.content : one.contentTo)
    }
    if (ran([BUN, ...LOCKFILE_ONLY], { cwd: tree }).code !== 0) return null
    return { was, now: readFileSync(at) }
  } catch {
    return null
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}

export type Locking = {
  readonly edits: readonly (Adding | Replacing)[]
  readonly said: readonly string[]
}

export const NOTHING_LOCKED: Locking = { edits: [], said: [] }

export function lockingOver(root: string, base: string, changes: readonly FileChange[]): Locking {
  const touched = manifestsIn(changes)
  const moved = manifestMovesIn(changes)
  const many = touched.length + moved.length
  if (many === 0 || carriesLock(changes)) return NOTHING_LOCKED
  const made = lockedOver(root, base, touched, moved)
  if (made === null) {
    return {
      edits: [],
      said: [
        `this change carries ${many} \`${MANIFEST}\` and \`${LOCK}\` could not be made ` +
          `again from the manifests at ${base}, so the lockfile went unchanged — a manifest ` +
          `parted from its lockfile refuses every install, and the tree will not install until ` +
          `the lockfile follows`,
        LOCKING_SPELLING,
      ],
    }
  }
  if (sameBytes(made.was, made.now)) return NOTHING_LOCKED
  const was = textOf(made.was)
  const now = textIn(made.now)
  return {
    edits: [
      was === null
        ? { kind: "add", path: LOCK, content: now }
        : { kind: "replace", path: LOCK, contentFrom: was, contentTo: now },
    ],
    said: [
      `\`${LOCK}\` was made again beside the ${many} \`${MANIFEST}\` this change ` +
        `carries, and lands in the same commit`,
      LOCKING_SPELLING,
    ],
  }
}

export function lockingFor(root: string, base: string, changes: readonly FileChange[]): Locking {
  try {
    return lockingOver(root, base, changes)
  } catch (thrown) {
    return {
      edits: [],
      said: [
        `\`${LOCK}\` could not be looked at for this change, so the lockfile went unchanged — ` +
          `${thrown instanceof Error ? thrown.message : String(thrown)}`,
      ],
    }
  }
}

export const INSTALL_SPELLING =
  `the lockfile is made without an install, so what the workspace reaches its packages through ` +
  `still points at the folders the manifests named before, and a landing carrying a ` +
  `\`${MANIFEST}\` installs the checkout to move it, once that landing has given up the hold`

export type Installing = {
  readonly said: readonly string[]
  readonly wrong: readonly string[]
}

export const NOTHING_INSTALLED: Installing = { said: [], wrong: [] }

function lockAt(root: string): Uint8Array | null {
  try {
    return readFileSync(join(root, LOCK))
  } catch {
    return null
  }
}

function namedAt(at: string): string | null {
  try {
    const held: unknown = JSON.parse(readFileSync(join(at, MANIFEST), "utf8"))
    if (typeof held !== "object" || held === null || !("name" in held)) return null
    const name = held.name
    return typeof name === "string" ? name : null
  } catch {
    return null
  }
}

function isStranded(at: string, called: string): boolean {
  try {
    if (!lstatSync(at).isSymbolicLink()) return false
  } catch {
    return false
  }
  if (!existsSync(at)) return true
  const named = namedAt(at)
  return named !== null && named !== called
}

function isFolder(at: string): boolean {
  try {
    return lstatSync(at).isDirectory()
  } catch {
    return false
  }
}

function strandedIn(root: string): readonly string[] {
  const modules = join(root, MODULES)
  const took: string[] = []
  const walk = (dir: string, deeper: boolean): undefined => {
    let names: readonly string[]
    try {
      names = readdirSync(dir)
    } catch {
      return
    }
    for (const name of names) {
      const one = join(dir, name)
      const called = relative(modules, one)
      if (isStranded(one, called)) {
        rmSync(one)
        took.push(called)
        continue
      }
      if (deeper && isFolder(one)) walk(one, false)
    }
  }
  walk(modules, true)
  return took.sort()
}

export function installedIn(root: string): Installing {
  const was = lockAt(root)
  const took = ran([BUN, ...INSTALL], { cwd: root })
  const spelt = [BUN, ...INSTALL].join(" ")
  if (took.code !== 0) {
    return {
      said: [],
      wrong: [
        `the commit was made and the checkout would not install onto it, so nothing in the tree ` +
          `resolves until \`${spelt}\` runs and answers — ${took.err.trim()}`,
        INSTALL_SPELLING,
      ],
    }
  }
  if (!sameBytes(was, lockAt(root))) {
    return {
      said: [],
      wrong: [
        `the commit was made and installing it made \`${LOCK}\` again, so the lockfile that ` +
          `commit carries is not the one its manifests warrant — land \`${LOCK}\` as it now is`,
        INSTALL_SPELLING,
      ],
    }
  }
  const stranded = strandedIn(root)
  return {
    said: [
      `the checkout was installed onto this commit, so what the workspace reaches its packages ` +
        `through follows the \`${MANIFEST}\` this change carries`,
      ...(stranded.length === 0
        ? []
        : [
            `${stranded.length} link(s) under \`${MODULES}\` reached a folder no \`${MANIFEST}\` ` +
              `names any more, so they are taken away — ${stranded.join(", ")}`,
          ]),
    ],
    wrong: [],
  }
}

export function installingIn(root: string, changes: readonly FileChange[]): Installing {
  if (!changes.flatMap(pathsOf).some(isManifest)) return NOTHING_INSTALLED
  if (!existsSync(join(root, MANIFEST))) return NOTHING_INSTALLED
  try {
    return installedIn(root)
  } catch (thrown) {
    return {
      said: [],
      wrong: [
        `the commit was made and the checkout could not be installed onto it — ` +
          `${thrown instanceof Error ? thrown.message : String(thrown)}`,
        INSTALL_SPELLING,
      ],
    }
  }
}
