import {
  carriersIn,
  declaredIn,
  refusalsOver,
} from "akasha/check/code/pages/build-folder-is-ignored/build-folder-is-ignored.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function buildFolderIsIgnored(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const index = commit.index
  const declared = carriersIn(index).flatMap((one) =>
    declaredIn(one.path, index.valuesByPath(one.pageTypeSlug).get(one.path) ?? null, index)
  )
  return refusalsOver(declared, commit.read)
}
