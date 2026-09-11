import { existsSync } from "node:fs"
import { join, relative } from "node:path"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { trackedUnder } from "akasha/git/pathspec/git-pathspec.module.code.ts"
import type { Answering } from "akasha/pages/indexes/answering/index-answering.module.code.ts"
import { walkedUnder } from "akasha/pages/indexes/tree-reading/tree-reading.module.code.ts"

const OUTSIDE = ".."

export function treeUnder(root: string, folder: string, index: Answering): readonly string[] {
  const at = join(root, folder)
  if (!existsSync(at)) return []
  const entering = (path: string): boolean => index.listedByPath(relative(root, path)).length === 0
  return walkedUnder(at, () => true, entering)
    .map((one) => relative(root, one))
    .sort()
}

export function treeUnentered(root: string, folder: string, index: Answering): readonly string[] {
  const at = join(root, folder)
  if (!existsSync(at)) return []
  const found: string[] = []
  const entering = (path: string): boolean => {
    if (index.listedByPath(relative(root, path)).length === 0) return true
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
