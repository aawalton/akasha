import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function withoutTheRuleStore(slug: string): Answer {
  return refused(
    `\`akasha ${slug}\` reads and writes no rule — the inventory rules code is not in akasha yet`,
    DATA
  )
}

export function withoutTheSavedVariables(slug: string): Answer {
  return refused(
    `\`akasha ${slug}\` reads nothing — the addon's saved-variables reader is not in akasha yet`,
    DATA
  )
}
