import type { Answer } from "@akasha/command-system/calling"
import { withoutTheSavedVariables } from "../code-outside-akasha/code-outside-akasha.module.code.ts"

export function temperInventoryMasterWritProbe(): Answer {
  return withoutTheSavedVariables("temper-inventory-master-writ-probe")
}
