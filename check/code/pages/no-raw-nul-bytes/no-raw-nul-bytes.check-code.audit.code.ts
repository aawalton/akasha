import {
  exemptIn,
  reasonsFor,
} from "akasha/check/code/pages/no-raw-nul-bytes/no-raw-nul-bytes.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noRawNulBytes(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const said: Judged[] = []
  for (const path of commit.paths) {
    if (exemptIn(path, commit)) continue
    const bytes = commit.bytes(path)
    if (bytes === null) continue
    for (const reason of reasonsFor(bytes)) said.push({ path, reason })
  }
  return said
}
