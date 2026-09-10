import {
  bodyOf,
  input,
  overEachFile,
  TEXTS,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Running } from "../../../modules/judging/judging.module.code.ts"
import { placesIn, refusedIn } from "./identifier-matches-its-place.code-check.decision.code.ts"

const refusalsIn: Running = (change, shadow) => {
  const wanted = change.changed.some((one) => textNamed(one))
  if (!wanted) return []
  const places = placesIn(change.root, shadow.index, shadow.codeAt)
  return overEachFile(change, (given) => {
    if (!textNamed(given.path)) return []
    return refusedIn(given.path, bodyOf(given), places)
  })
}

export const identifierMatchesItsPlace = input(TEXTS, refusalsIn)
