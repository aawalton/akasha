import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperInventorySnapshot(): Answer {
  return refused(
    "the holdings snapshot pages are not reachable from akasha yet, so nothing here joins one back together",
    DATA
  )
}
