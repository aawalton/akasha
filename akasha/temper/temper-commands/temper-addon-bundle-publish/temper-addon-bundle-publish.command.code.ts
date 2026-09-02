import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperAddonBundlePublish(): Answer {
  return refused(
    "the addons under `temper/addons` are not in akasha yet, so nothing here builds a bundle to publish",
    DATA
  )
}
