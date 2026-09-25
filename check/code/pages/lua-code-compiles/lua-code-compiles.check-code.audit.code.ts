import { judgedAcross } from "akasha/check/code/pages/lua-code-compiles/lua-code-compiles.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { librariesIn } from "akasha/code/lua-runtime-library/modules/config-claiming/config-claiming.module.code.ts"

export function luaCodeCompiles(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return judgedAcross(librariesIn([], commit.read, commit.index), commit.paths, commit.bytes)
}
