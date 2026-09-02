import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperUpstreamDataPort(): Answer {
  return refused(
    "the upstream library ports are not in akasha yet, so nothing here has data to port",
    DATA
  )
}
