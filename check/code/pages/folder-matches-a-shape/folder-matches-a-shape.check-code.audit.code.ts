import { judgingOver } from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.code.ts"
import {
  type Grouped,
  groupedIn,
} from "akasha/check/code/pages/folder-matches-a-shape/modules/folder-grouping/folder-grouping.module.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { folderOf } from "akasha/code/path/modules/between/code-path-between.module.code.ts"
import {
  facingOn,
  generatedIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"

const ROOT = ""

export function everyFolderIn(grouped: Grouped): readonly string[] {
  const found = [ROOT]
  const left = [ROOT]
  while (left.length > 0) {
    const at = left.pop()
    if (at === undefined) continue
    for (const one of grouped.foldersIn(at)) {
      found.push(one)
      left.push(one)
    }
  }
  return found
}

export function folderMatchesAShape(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const facing = facingOn(root)
  const grouped = groupedIn(
    root,
    commit.paths,
    (path) => commit.read(path) !== null,
    (path) => generatedIn(facing, path)
  )
  const seeing = {
    index: commit.index,
    pageOf: commit.pageOf,
    codeAt: (path: string): string => path,
    listed: (folder: string): readonly string[] =>
      commit.paths.filter((one) => folderOf(one) === folder),
  }
  const judging = judgingOver({ root, seeing, grouped })
  return judging.refusalsAt(everyFolderIn(grouped))
}
