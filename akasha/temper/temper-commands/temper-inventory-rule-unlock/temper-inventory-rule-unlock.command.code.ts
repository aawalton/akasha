import type { Answer } from "@akasha/command-system/calling"
import { withoutTheRuleStore } from "../code-outside-akasha/code-outside-akasha.module.code.ts"

export function temperInventoryRuleUnlock(): Answer {
  return withoutTheRuleStore("temper-inventory-rule-unlock")
}
