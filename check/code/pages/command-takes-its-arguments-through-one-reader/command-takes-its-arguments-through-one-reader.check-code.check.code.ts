import {
  found,
  openingIn,
  reaching,
} from "akasha/check/code/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.check-code.decision.code.ts"
import { input, TEXTS } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export const commandTakesItsArgumentsThroughOneReader = input(TEXTS, (change, shadow) => {
  const reach = reaching(openingIn(change))
  const said: Judged[] = []
  for (const given of TEXTS.from(change, shadow)) {
    for (const reason of found(given.path, given.text, reach)) {
      said.push({ path: given.path, reason })
    }
  }
  return said
})
