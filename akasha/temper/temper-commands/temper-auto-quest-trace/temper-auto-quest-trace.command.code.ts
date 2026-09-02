import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperAutoQuestTrace(): Answer {
  return refused(
    "the quests addon's trace reader is not in akasha yet, so nothing here reads a trace",
    DATA
  )
}
