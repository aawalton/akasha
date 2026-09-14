import { existsSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import type {
  Answer,
  FileChange,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { trackedUnder } from "akasha/git/modules/pathspec/git-pathspec.module.code.ts"
import type { Answering } from "akasha/pages/indexes/modules/answering/index-answering.module.code.ts"
import {
  claimantOf,
  type Listing,
} from "akasha/pages/indexes/modules/path-claiming/path-claiming.module.code.ts"
import {
  filesIn,
  foldersIn,
  walkedUnder,
} from "akasha/pages/indexes/modules/tree-reading/tree-reading.module.code.ts"

const OUTSIDE = ".."

const UNDER = "/"

const HERE = "."

function claimingIn(root: string, index: Answering): (path: string) => boolean {
  const listing: Listing = (folder) => filesIn(root, folder)
  const pageTypes = index.pageTypesIn()
  const fileProperties = index.filePropertiesAt()
  const folders = index.folderPropertiesAt()
  return (path) =>
    claimantOf(listing, relative(root, path), pageTypes, fileProperties, folders) !== null
}

export function treeUnder(root: string, folder: string, index: Answering): readonly string[] {
  const at = join(root, folder)
  if (!existsSync(at)) return []
  const claimed = claimingIn(root, index)
  return walkedUnder(
    at,
    () => true,
    (path) => !claimed(path)
  )
    .map((one) => relative(root, one))
    .sort()
}

export function treeUnentered(root: string, folder: string, index: Answering): readonly string[] {
  const at = join(root, folder)
  if (!existsSync(at)) return []
  const claimed = claimingIn(root, index)
  const found: string[] = []
  const entering = (path: string): boolean => {
    if (!claimed(path)) return true
    if (walkedUnder(path, () => true).length > 0) found.push(relative(root, path))
    return false
  }
  walkedUnder(at, () => false, entering)
  return [...found].sort()
}

export function treeTracked(root: string, folder: string): readonly string[] | null {
  const held = trackedUnder(root, folder)
  if (held === null) return null
  return held.filter((one) => existsSync(join(root, one)))
}

function beneath(folder: string, path: string): boolean {
  const held = relative(folder, path)
  return held !== "" && !held.startsWith(OUTSIDE)
}

export function underOver(had: readonly string[], said: Answer, folder: string): readonly string[] {
  const found = new Set(had)
  for (const one of said.edits) {
    if (one.kind === "remove") found.delete(one.path)
    else if (one.kind === "move") {
      found.delete(one.pathFrom)
      found.add(one.pathTo)
    } else found.add(one.path)
  }
  return [...found].filter((one) => beneath(folder, one)).sort()
}

export type Holding = (folder: string) => boolean

function laidOver(edits: readonly FileChange[]): ReadonlyMap<string, boolean> {
  const found = new Map<string, boolean>()
  for (const one of edits) {
    if (one.kind === "move") {
      found.set(one.pathFrom, false)
      found.set(one.pathTo, true)
      continue
    }
    found.set(one.path, one.kind !== "remove")
  }
  return found
}

function aboveIn(laid: ReadonlyMap<string, boolean>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const [path, there] of laid) {
    if (!there) continue
    for (let at = dirname(path); at !== HERE && at !== UNDER; at = dirname(at)) {
      if (found.has(at)) break
      found.add(at)
    }
  }
  return found
}

function offRepo(folder: string): boolean {
  return folder === "" || folder.startsWith(UNDER) || folder.split(UNDER).includes(OUTSIDE)
}

export function holdingOver(root: string, edits: readonly FileChange[]): Holding {
  const laid = laidOver(edits)
  const above = aboveIn(laid)
  const held = new Map<string, boolean>()
  const asked: Holding = (folder) => {
    if (above.has(folder)) return true
    if (offRepo(folder)) return false
    const found = held.get(folder)
    if (found !== undefined) return found
    held.set(folder, false)
    const said =
      filesIn(root, folder).some((one) => laid.get(one) !== false) ||
      foldersIn(root, folder).some((one) => asked(one))
    held.set(folder, said)
    return said
  }
  return asked
}
