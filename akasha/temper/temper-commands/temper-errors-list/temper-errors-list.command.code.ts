import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperErrorsList(): Answer {
  return refused(
    "the errors addon's capture reader is not in akasha yet, so nothing here reads its errors",
    DATA
  )
}
