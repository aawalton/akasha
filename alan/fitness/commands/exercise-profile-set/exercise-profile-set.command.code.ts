import type { Answer } from "@akasha/command-system/calling"
import { writeBodyweight } from "@akasha/exercise-access/selection-policy"
import {
  asJson,
  DATA,
  decimalIn,
  JSON_SAID,
  refusedBy,
  rowsOf,
  told,
  wantsJson,
  wordsIn,
} from "../exercise-saying/exercise-saying.module.code.ts"

const BODYWEIGHT = "--bodyweight"

const SHAPE = { valued: [BODYWEIGHT], switches: [JSON_SAID] }

export async function exerciseProfileSet(argv: readonly string[] = []): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  const bodyweight = decimalIn(said, BODYWEIGHT)
  if (typeof bodyweight === "object") return refusedBy(bodyweight.refused)
  let at: string
  try {
    at = await writeBodyweight(bodyweight)
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
  if (wantsJson(said)) return asJson({ at, bodyweight })
  return told(
    rowsOf([
      ["at", at],
      ["bodyweight", String(bodyweight)],
    ])
  )
}
