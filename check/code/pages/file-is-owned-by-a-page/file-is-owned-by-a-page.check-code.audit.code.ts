import {
  claimingOver,
  reasonsOver,
} from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  folderOf,
  type Listing,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"

const NOTHING: readonly string[] = []

function listingOf(paths: readonly string[]): Listing {
  const found = new Map<string, string[]>()
  for (const path of paths) {
    const folder = folderOf(path)
    const held = found.get(folder)
    if (held === undefined) found.set(folder, [path])
    else held.push(path)
  }
  return (folder) => found.get(folder) ?? NOTHING
}

export function fileIsOwnedByAPage(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const held = claimingOver(listingOf(commit.paths), commit.index)
  const said: Judged[] = []
  for (const path of commit.paths) {
    if (commit.read(path) === null) continue
    for (const reason of reasonsOver(held, path)) said.push({ path, reason })
  }
  return said
}
