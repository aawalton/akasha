import { existsSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import type { Answer, FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { ignoredUnder, trackedUnder } from "akasha/git/modules/pathspec/git-pathspec.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  claimantOf,
  folderOf,
  type Paging,
  pagingOf,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import { walkedUnder } from "akasha/page/index/modules/tree-reading/tree-reading.module.code.ts"
import { VENDOR_ROOT } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  partedIn,
  uncommittedHeld,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const OUTSIDE = ".."

const UNDER = "/"

const HERE = "."

const HELD = "ts"

function pagedOver(laid: ReadonlyMap<string, boolean>): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, string[]>()
  for (const [path, there] of laid) {
    if (!there) continue
    const said = partedIn(path)
    if (said === null || said.sections.length > 0 || said.held !== HELD) continue
    const held = found.get(said.pageType)
    if (held === undefined) found.set(said.pageType, [path])
    else held.push(path)
  }
  return found
}

function pagingIn(index: Answering, laid: ReadonlyMap<string, boolean>): Paging {
  const put = pagedOver(laid)
  return pagingOf((pageTypeSlug) => [
    ...index.everyOfType(pageTypeSlug).filter((one) => laid.get(one.path) !== false),
    ...(put.get(pageTypeSlug) ?? []).map((path) => ({ path })),
  ])
}

type Claiming = (path: string) => boolean

function claimingIn(index: Answering, laid: ReadonlyMap<string, boolean>): Claiming {
  const paging = pagingIn(index, laid)
  const pageTypes = index.pageTypesIn()
  const fileProperties = index.filePropertiesAt()
  const folders = index.folderPropertiesAt()
  const extensions = index.extensionPropertiesAt()
  const asked = new Map<string, boolean>()
  return (path) => {
    const done = asked.get(path)
    if (done !== undefined) return done
    const said = claimantOf(paging, path, pageTypes, fileProperties, folders, extensions) !== null
    asked.set(path, said)
    return said
  }
}

function filesThere(
  root: string,
  folder: string,
  entering: (path: string) => boolean = () => true
): readonly string[] {
  const at = join(root, folder)
  if (!existsSync(at)) return []
  return walkedUnder(at, () => true, entering).map((one) => relative(root, one))
}

export function treeUnder(
  root: string,
  folder: string,
  index: Answering,
  over: Answer
): readonly string[] {
  const claimed = claimingIn(index, laidOver(over.edits))
  const had = filesThere(root, folder, (path) => !claimed(relative(root, path)))
  return underOver(had, over, folder)
}

export function treeUnentered(
  root: string,
  folder: string,
  index: Answering,
  over: Answer
): readonly string[] {
  const laid = laidOver(over.edits)
  const claimed = claimingIn(index, laid)
  const holds = (one: string): boolean => underOver(filesThere(root, one), over, one).length > 0
  const found = new Set<string>()
  const entered = new Set<string>([folder])
  const at = join(root, folder)
  const entering = (path: string): boolean => {
    const one = relative(root, path)
    if (!claimed(one)) {
      entered.add(one)
      return true
    }
    if (holds(one)) found.add(one)
    return false
  }
  if (existsSync(at)) walkedUnder(at, () => false, entering)
  for (const one of [...aboveIn(laid)].sort()) {
    if (!beneath(folder, one) || !entered.has(folderOf(one))) continue
    if (!claimed(one)) entered.add(one)
    else if (holds(one)) found.add(one)
  }
  return [...found].sort()
}

function heldThough(path: string): boolean {
  return uncommittedHeld(path) && !path.split(UNDER).includes(VENDOR_ROOT)
}

export function treeTracked(root: string, folder: string, over: Answer): readonly string[] | null {
  const held = trackedUnder(root, folder)
  if (held === null) return null
  const ignored = ignoredUnder(root, folder)
  if (ignored === null) return null
  return underOver(
    [...held, ...ignored.filter(heldThough)].filter((one) => existsSync(join(root, one))),
    over,
    folder
  )
}

function beneath(folder: string, path: string): boolean {
  const held = relative(folder, path)
  return held !== "" && !held.startsWith(OUTSIDE)
}

function underOver(had: readonly string[], said: Answer, folder: string): readonly string[] {
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

export type Naming = (path: string) => boolean

export function namesOver(root: string, over: Answer): Naming {
  const laid = laidOver(over.edits)
  const above = aboveIn(laid)
  const asked = new Map<string, boolean>()
  return (path) => {
    if (offRepo(path)) return false
    const written = laid.get(path)
    if (written !== undefined) return written
    if (above.has(path)) return true
    const done = asked.get(path)
    if (done !== undefined) return done
    const there = existsSync(join(root, path))
    asked.set(path, there)
    return there
  }
}
