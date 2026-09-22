import {
  type Indexing,
  manifestIn,
  refusalsOver,
} from "akasha/check/code/pages/extension-host-reaches-no-bun-code/extension-host-reaches-no-bun-code.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { folderOf } from "akasha/code/path/modules/between/code-path-between.module.code.ts"

export function extensionHostReachesNoBunCode(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const indexing: Indexing = {
    listed: (folder) => commit.paths.filter((one) => folderOf(one) === folder),
    valueAt: (path) => commit.pageOf(path),
    fileKeysAt: () => commit.index.fileKeysAt(),
  }
  return refusalsOver(commit, manifestIn(indexing))
}
