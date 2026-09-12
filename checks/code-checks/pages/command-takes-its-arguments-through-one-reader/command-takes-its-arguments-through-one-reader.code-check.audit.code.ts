import {
  found,
  openingIn,
  reaching,
} from "akasha/checks/code-checks/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.code-check.decision.code.ts"
import {
  everythingIn,
  overEveryIn,
  textNamed,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function commandTakesItsArgumentsThroughOneReader(root: string): readonly Judged[] {
  const change = everythingIn(root)
  const reach = reaching(openingIn(change))
  return overEveryIn(change, textNamed, (path, text) => found(path, text, reach))
}
