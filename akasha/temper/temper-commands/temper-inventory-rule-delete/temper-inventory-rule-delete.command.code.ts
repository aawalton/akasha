import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperInventoryRuleDelete(): Answer {
  return refused(
    "the inventory rules code is not in akasha yet, so nothing here reads or writes a rule",
    DATA
  )
}
