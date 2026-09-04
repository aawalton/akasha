import type { Answer } from "@akasha/command-system/calling"
import { selectionPolicyStated } from "@akasha/exercise-access/selection-policy"
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

export function exercisePolicyShow(argv: readonly string[] = []): Answer {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  let stated: ReadonlyMap<string, number>
  try {
    stated = selectionPolicyStated()
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
  if (wantsJson(said)) return asJson(Object.fromEntries(stated))
  return told(rowsOf([...stated].map(([key, value]) => [key, String(value)] as const)))
}
