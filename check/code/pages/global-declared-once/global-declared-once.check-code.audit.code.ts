import {
  clashesIn,
  judgedOf,
} from "akasha/check/code/pages/global-declared-once/global-declared-once.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { compiled } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"

export function globalDeclaredOnce(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const paths = commit.paths.filter((one) => compiled(one))
  return judgedOf(clashesIn(paths, (path) => commit.read(path)))
}
