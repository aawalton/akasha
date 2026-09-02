import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperCatalogStatus(): Answer {
  return refused(
    "the catalog addon's capture reader is not in akasha yet, so nothing here reads its state",
    DATA
  )
}
