import {
  found,
  openingIn,
  reaching,
} from "akasha/check/code/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.check-code.decision.code.ts"
import {
  everythingIn,
  overEveryIn,
  textNamed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function commandTakesItsArgumentsThroughOneReader(root: string): readonly Judged[] {
  const change = everythingIn(root)
  const reach = reaching(openingIn(change))
  return overEveryIn(change, textNamed, (path, text) => found(path, text, reach))
}
