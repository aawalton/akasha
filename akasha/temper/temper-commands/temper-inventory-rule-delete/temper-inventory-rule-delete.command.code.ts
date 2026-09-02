import type { Answer } from "@akasha/command-system/calling"
import { withoutTheRuleStore } from "../code-outside-akasha/code-outside-akasha.module.code.ts"

export function temperInventoryRuleDelete(): Answer {
  return withoutTheRuleStore("temper-inventory-rule-delete")
}
