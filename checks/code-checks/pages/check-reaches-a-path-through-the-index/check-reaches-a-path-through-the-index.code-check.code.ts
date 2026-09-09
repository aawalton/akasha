import type { Shadow } from "@akasha/pages/shadow"
import {
  type Body,
  bodyOf,
  FILES,
  judgingEach,
  type Selector,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  type Asking,
  askingOver,
  judgedBy,
  reasonsIn,
} from "./check-reaches-a-path-through-the-index.code-check.decision.code.ts"

const JUDGED = new WeakMap<Shadow, (path: string) => boolean>()

function judgedFor(shadow: Shadow): (path: string) => boolean {
  const found = JUDGED.get(shadow)
  if (found !== undefined) return found
  const made = judgedBy(shadow.index.pageTypesIn())
  JUDGED.set(shadow, made)
  return made
}

const ASKING = new WeakMap<Shadow, Asking>()

function askingFor(shadow: Shadow): Asking {
  const found = ASKING.get(shadow)
  if (found !== undefined) return found
  const made = askingOver(shadow.index.everyPath())
  ASKING.set(shadow, made)
  return made
}

export const PAGE_CODE: Selector<Body> = {
  named: "the code a page runs",
  isInput: (path, shadow) => judgedFor(shadow)(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => judgedFor(shadow)(one.path)),
}

export const checkReachesAPathThroughTheIndex = judgingEach(PAGE_CODE, (given, shadow) =>
  reasonsIn(askingFor(shadow), given.path, bodyOf(given))
)
