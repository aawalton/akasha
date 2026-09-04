import type { Answer } from "@akasha/command-system/calling"
import { readBodyweight } from "@akasha/exercise-access/selection-policy"
import {
  asJson,
  DATA,
  JSON_SAID,
  refusedBy,
  rowsOf,
  told,
  wantsJson,
  wordsIn,
} from "../exercise-saying/exercise-saying.module.code.ts"

const SHAPE = { switches: [JSON_SAID] }

export function exerciseProfileShow(argv: readonly string[] = []): Answer {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  let bodyweight: number
  try {
    bodyweight = readBodyweight()
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
  if (wantsJson(said)) return asJson({ bodyweight })
  return told(rowsOf([["bodyweight", String(bodyweight)]]))
}
