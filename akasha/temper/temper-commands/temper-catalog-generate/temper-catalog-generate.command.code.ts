import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperCatalogGenerate(): Answer {
  return refused(
    "the catalog packages are not in akasha yet, so nothing here writes a catalog data file",
    DATA
  )
}
