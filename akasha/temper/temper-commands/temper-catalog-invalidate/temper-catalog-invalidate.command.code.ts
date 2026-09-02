import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperCatalogInvalidate(): Answer {
  return refused(
    "the catalog addon's registry of domains is not in akasha yet, so nothing here writes a request",
    DATA
  )
}
