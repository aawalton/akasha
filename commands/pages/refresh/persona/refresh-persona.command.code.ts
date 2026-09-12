import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import {
  rebuildPoints,
  saidOf,
} from "akasha/alan/harness/persona-points-rebuilding/persona-points-rebuilding.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import {
  answering,
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { refreshPersona as page } from "akasha/commands/pages/refresh/persona/refresh-persona.command.ts"

const NOTHING_REBUILT =
  "no persona was written to on any day before today, so nothing was rebuilt. A figure Alan did " +
  "not earn her would be a lie, and the figures already kept are left as they were."

export async function refreshPersona(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking(read.refused)
  return await answering((done) => {
    const rebuilt = rebuildPoints(given.root, getEsoDayStr(new Date()), done)
    if (rebuilt.rebuilt === 0) {
      return refusedBy([NOTHING_REBUILT, ...rebuilt.unread], DATA)
    }
    return told([saidOf(rebuilt.rebuilt), ...rebuilt.unread])
  })
}
