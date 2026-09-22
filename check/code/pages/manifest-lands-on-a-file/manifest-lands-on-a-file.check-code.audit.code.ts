import {
  type Asking,
  refusalsOver,
} from "akasha/check/code/pages/manifest-lands-on-a-file/manifest-lands-on-a-file.check-code.decision.code.ts"
import {
  type Commit,
  commitIn,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { manifestsIn } from "akasha/code/workspace/modules/manifest-finding/manifest-finding.module.code.ts"

export function askingAt(commit: Commit): Asking {
  return { textAt: commit.read, there: (path) => commit.read(path) !== null }
}

export function manifestLandsOnAFile(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsOver(manifestsIn(commit), askingAt(commit))
}
