import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperAddonDataGenerate(): Answer {
  return refused(
    "every page these tables are rendered from is in akasha, and ten of the thirteen have no akasha module to land in, so nothing here writes them",
    DATA
  )
}
