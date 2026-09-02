import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperCommunityAddonUpdate(): Answer {
  return refused(
    "the community addon catalog reader is not in akasha yet, so nothing here updates them",
    DATA
  )
}
