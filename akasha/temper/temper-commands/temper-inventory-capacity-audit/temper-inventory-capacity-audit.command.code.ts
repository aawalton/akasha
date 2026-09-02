import type { Answer } from "@akasha/command-system/calling"
import { withoutTheSavedVariables } from "../code-outside-akasha/code-outside-akasha.module.code.ts"

export function temperInventoryCapacityAudit(): Answer {
  return withoutTheSavedVariables("temper-inventory-capacity-audit")
}
