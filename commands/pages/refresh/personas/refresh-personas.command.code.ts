import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import {
  rebuildPoints,
  saidOf,
} from "../../../../alan/harness/persona-points-rebuilding/persona-points-rebuilding.module.code.ts"
import type { Answer, Given } from "../../../../command-system/calling/calling.module.code.ts"

const NOTHING_REBUILT =
  "no persona was written to on any day before today, so nothing was rebuilt. A figure Alan did " +
  "not earn her would be a lie, and the figures already kept are left as they were."

export function refreshPersonas(_argv: readonly string[], given: Given): Answer {
  const done = rebuildPoints(given.root, getEsoDayStr(new Date()))
  if (done.rebuilt === 0) {
    return { report: [], refusals: [NOTHING_REBUILT, ...done.unread], code: 2 }
  }
  return { report: [saidOf(done.rebuilt), ...done.unread], refusals: [], code: 0 }
}
