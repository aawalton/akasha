import {
  linesOf,
  readingsIn,
} from "akasha/agent/model/account/modules/measuring/model-account-measuring.module.code.ts"
import {
  notesOf,
  refreshAll,
} from "akasha/agent/model/account/modules/refreshing/model-account-refreshing.module.code.ts"
import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import {
  DATA,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { measureModelAccountUsage as page } from "akasha/command/pages/measure/model/account/usage/measure-model-account-usage.command.ts"

export async function measureModelAccountUsage(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking(read.refused)
  const notes = notesOf(await refreshAll(given.root, Date.now()))
  const readings = readingsIn(given.root)
  if (readings.length === 0) {
    return refusedBy(
      [
        `no model-account page sits under \`${given.root}\`, and every account holding a page ` +
          `is answered, so a fleet of none is the pages being wrong rather than a fleet`,
      ],
      DATA
    )
  }
  const said = [...linesOf(readings, Date.now())]
  return told(notes.length === 0 ? said : [...said, "", ...notes])
}
