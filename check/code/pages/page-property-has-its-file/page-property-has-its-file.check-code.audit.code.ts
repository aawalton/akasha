import {
  refusalsIn,
  type Walking,
} from "akasha/check/code/pages/page-property-has-its-file/page-property-has-its-file.check-code.decision.code.ts"
import {
  type Commit,
  commitIn,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { folderOf } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"

const NONE: readonly string[] = []

function walkingIn(commit: Commit): Walking {
  const under = new Map<string, string[]>()
  for (const path of commit.paths) {
    const folder = folderOf(path)
    const held = under.get(folder)
    if (held === undefined) under.set(folder, [path])
    else held.push(path)
  }
  return {
    root: commit.root,
    paths: commit.paths,
    read: commit.read,
    holds: (path) => commit.read(path) !== null,
    listed: (folder) => under.get(folder) ?? NONE,
  }
}

export function pagePropertyHasItsFile(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsIn(walkingIn(commit), commit)
}
