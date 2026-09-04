import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { argvFor } from "@akasha/git/git-running"
import { ran } from "@akasha/utils-run/running"
import { holding } from "../holding/holding.module.code.ts"
import type { FileEdit } from "../landing/landing.module.code.ts"

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

export const LOCKING_SPELLING =
  `the lockfile is made again from the manifests the base commit tracks with this change worked ` +
  `into them, so a change touching no \`${MANIFEST}\` is left alone and a change carrying its own ` +
  `\`${LOCK}\` is taken at its word`

export function manifestsIn(changes: readonly FileEdit[]): readonly FileEdit[] {
  return changes.filter(
    (one) => one.path === MANIFEST || one.path.endsWith(`${PARTED_BY}${MANIFEST}`)
  )
}

export function carriesLock(changes: readonly FileEdit[]): boolean {
  return changes.some((one) => one.path === LOCK)
}

export function sameBytes(one: Uint8Array | null, other: Uint8Array | null): boolean {
  if (one === null || other === null) return one === other
  if (one.length !== other.length) return false
  return one.every((byte, at) => byte === other[at])
}

export type Made = { readonly was: Uint8Array | null; readonly now: Uint8Array } | null

export function lockedOver(root: string, base: string, touched: readonly FileEdit[]): Made {
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
    for (const one of touched) {
      const to = join(tree, one.path)
      if (one.body === null) {
        rmSync(to, { force: true })
        continue
      }
      mkdirSync(dirname(to), { recursive: true })
      writeFileSync(to, one.body)
    }
    if (ran([BUN, ...LOCKFILE_ONLY], { cwd: tree }).code !== 0) return null
    return { was, now: readFileSync(at) }
  } catch {
    return null
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}

export type Locking = { readonly edits: readonly FileEdit[]; readonly said: readonly string[] }

export const NOTHING_LOCKED: Locking = { edits: [], said: [] }

export function lockingOver(root: string, base: string, changes: readonly FileEdit[]): Locking {
  const touched = manifestsIn(changes)
  if (touched.length === 0 || carriesLock(changes)) return NOTHING_LOCKED
  const made = lockedOver(root, base, touched)
  if (made === null) {
    return {
      edits: [],
      said: [
        `this change carries ${touched.length} \`${MANIFEST}\` and \`${LOCK}\` could not be made ` +
          `again from the manifests at ${base}, so the lockfile went unchanged — a manifest ` +
          `parted from its lockfile refuses every install, and the tree will not install until ` +
          `the lockfile follows`,
        LOCKING_SPELLING,
      ],
    }
  }
  if (sameBytes(made.was, made.now)) return NOTHING_LOCKED
  return {
    edits: [{ path: LOCK, body: made.now }],
    said: [
      `\`${LOCK}\` was made again beside the ${touched.length} \`${MANIFEST}\` this change ` +
        `carries, and lands in the same commit`,
      LOCKING_SPELLING,
    ],
  }
}

export function lockingFor(root: string, base: string, changes: readonly FileEdit[]): Locking {
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
  `\`${MANIFEST}\` installs the checkout under the hold to move it`

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
  return {
    said: [
      `the checkout was installed onto this commit, so what the workspace reaches its packages ` +
        `through follows the \`${MANIFEST}\` this change carries`,
    ],
    wrong: [],
  }
}

export function installingIn(root: string, changes: readonly FileEdit[]): Installing {
  if (manifestsIn(changes).length === 0) return NOTHING_INSTALLED
  try {
    return holding(root, () => installedIn(root))
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
