import { refusalsIn } from "akasha/check/code/pages/require-import-extension/require-import-extension.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function requireImportExtension(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsIn(commit.paths, commit.read, (at) => commit.read(at) !== null)
}
