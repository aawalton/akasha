import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperAddonGenerateLoadOrder(): Answer {
  return refused(
    "the addons under `temper/addons` are not in akasha yet, so nothing here writes a load order",
    DATA
  )
}
