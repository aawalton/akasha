import {
  outsideBy,
  reasonsOf,
} from "akasha/checks/code-checks/pages/repository-is-written-by-a-change/repository-is-written-by-a-change.code-check.decision.code.ts"
import {
  input,
  type Selector,
  TEXTS,
  type Text,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

const OUTSIDE_BY = new WeakMap<Shadow, (path: string) => boolean>()

function outsideFor(shadow: Shadow): (path: string) => boolean {
  const found = OUTSIDE_BY.get(shadow)
  if (found !== undefined) return found
  const made = outsideBy(shadow)
  OUTSIDE_BY.set(shadow, made)
  return made
}

const OUTSIDE: Selector<Text> = {
  named: "the code outside the changes",
  isInput: (path, shadow) => outsideFor(shadow)(path),
  from: (change, shadow) =>
    TEXTS.from(change, shadow).filter((one) => outsideFor(shadow)(one.path)),
}

export const repositoryIsWrittenByAChange = input(OUTSIDE, (change, shadow) => {
  const reasons = reasonsOf(change, shadow)
  const said: Judged[] = []
  for (const given of OUTSIDE.from(change, shadow)) {
    for (const reason of reasons(given.path, given.text)) said.push({ path: given.path, reason })
  }
  return said
})
