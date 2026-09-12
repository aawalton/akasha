import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import {
  rebuildPoints,
  saidOf,
} from "akasha/alan/harness/persona-points-rebuilding/persona-points-rebuilding.module.code.ts"
import {
  answering,
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

const NOTHING_REBUILT =
  "no persona was written to on any day before today, so nothing was rebuilt. A figure Alan did " +
  "not earn her would be a lie, and the figures already kept are left as they were."

export async function refreshPersona(_argv: readonly string[], given: Given): Promise<Answer> {
  return await answering((done) => {
    const rebuilt = rebuildPoints(given.root, getEsoDayStr(new Date()), done)
    if (rebuilt.rebuilt === 0) {
      return refusedBy([NOTHING_REBUILT, ...rebuilt.unread], DATA)
    }
    return told([saidOf(rebuilt.rebuilt), ...rebuilt.unread])
  })
}
