import type { Shadow } from "@akasha/pages/shadow"
import {
  judgingEach,
  type Selector,
  TEXTS,
  type Text,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  outsideBy,
  reasonsOf,
} from "./repository-is-written-by-a-change.code-check.decision.code.ts"

type Reasons = (at: string, text: string) => readonly string[]

const OUTSIDE_BY = new WeakMap<Shadow, (path: string) => boolean>()

const REASONS_BY = new WeakMap<Shadow, Reasons>()

function reasonsFor(shadow: Shadow, root: string): Reasons {
  const found = REASONS_BY.get(shadow)
  if (found !== undefined) return found
  const made = reasonsOf(root)
  REASONS_BY.set(shadow, made)
  return made
}

function outsideFor(shadow: Shadow): (path: string) => boolean {
  const found = OUTSIDE_BY.get(shadow)
  if (found !== undefined) return found
  const made = outsideBy(shadow)
  OUTSIDE_BY.set(shadow, made)
  return made
}

export const OUTSIDE: Selector<Text> = {
  named: "the code outside the changes",
  isInput: (path, shadow) => outsideFor(shadow)(path),
  from: (change, shadow) =>
    TEXTS.from(change, shadow).filter((one) => outsideFor(shadow)(one.path)),
}

export const repositoryIsWrittenByAChange = judgingEach(OUTSIDE, (given, shadow) =>
  reasonsFor(shadow, given.root)(given.path, given.text)
)
