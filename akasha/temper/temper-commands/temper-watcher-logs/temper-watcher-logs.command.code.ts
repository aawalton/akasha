import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const DATA = 2

export function temperWatcherLogs(): Answer {
  return refused(
    "the workstation watcher is not in akasha yet, so nothing here reads its logs",
    DATA
  )
}
