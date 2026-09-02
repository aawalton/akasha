import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperInventoryDecodeLink(): Answer {
  return refused("the item link parser is not in akasha yet, so nothing here reads a link", DATA)
}
