import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperInventoryBankProfile(): Answer {
  return refused(
    "the reader of the addon's saved variables is not in akasha yet, so nothing here reads them",
    DATA
  )
}
