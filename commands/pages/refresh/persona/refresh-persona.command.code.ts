import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import {
  rebuildPoints,
  saidOf,
} from "akasha/alan/harness/persona-points-rebuilding/persona-points-rebuilding.module.code.ts"
import {
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

const NOTHING_REBUILT =
  "no persona was written to on any day before today, so nothing was rebuilt. A figure Alan did " +
  "not earn her would be a lie, and the figures already kept are left as they were."

export function refreshPersona(_argv: readonly string[], given: Given): Answer {
  const done = rebuildPoints(given.root, getEsoDayStr(new Date()))
  if (done.rebuilt === 0) {
    return refusedBy([NOTHING_REBUILT, ...done.unread], DATA)
  }
  return told([saidOf(done.rebuilt), ...done.unread])
}
