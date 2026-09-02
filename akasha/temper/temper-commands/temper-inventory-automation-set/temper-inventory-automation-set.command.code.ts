import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperInventoryAutomationSet(): Answer {
  return refused(
    "the inventory automation settings are not in akasha yet, so nothing here sets a toggle",
    DATA
  )
}
