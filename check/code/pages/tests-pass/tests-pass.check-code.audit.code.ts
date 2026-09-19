import { refusalsOver } from "akasha/check/code/pages/tests-pass/tests-pass.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export async function testsPass(root: string): Promise<readonly Judged[]> {
  return await refusalsOver(everythingIn(root), shadowAt(root))
}
