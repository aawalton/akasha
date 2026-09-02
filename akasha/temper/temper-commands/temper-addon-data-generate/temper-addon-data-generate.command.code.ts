import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperAddonDataGenerate(): Answer {
  return refused(
    "the pages the addon data is generated from are not in akasha yet, so nothing here writes it",
    DATA
  )
}
