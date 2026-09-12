import {
  found,
  openingIn,
  openingUnder,
  reaching,
} from "akasha/checks/code-checks/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.code-check.decision.code.ts"
import type { Body } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import {
  bodyOf,
  input,
  TEXTS,
  textNamed,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function reasonsIn(given: Body): readonly string[] {
  if (!textNamed(given.path)) return []
  return found(given.path, bodyOf(given), reaching(openingUnder(given.root)))
}

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
