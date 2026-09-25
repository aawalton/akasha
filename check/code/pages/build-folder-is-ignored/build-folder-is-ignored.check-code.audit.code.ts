import {
  buildFoldersIn,
  carriersIn,
  declaredIn,
  refusalsOver,
} from "akasha/check/code/pages/build-folder-is-ignored/build-folder-is-ignored.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function buildFolderIsIgnored(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const folders = buildFoldersIn(commit.index)
  const declared = carriersIn(commit.index, folders).flatMap((one) =>
    declaredIn(one.path, commit.index.valuesByPath(one.pageTypeSlug).get(one.path) ?? null, folders)
  )
  return refusalsOver(declared, commit.read)
}
