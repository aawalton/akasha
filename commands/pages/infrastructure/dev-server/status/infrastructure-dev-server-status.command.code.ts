import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { seq } from "akasha/commands/arguments/pages/seq.argument.ts"
import { webApp } from "akasha/commands/arguments/pages/web-app.argument.ts"
import {
  asJson,
  codeOf,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { infrastructureDevServerStatus as page } from "akasha/commands/pages/infrastructure/dev-server/status/infrastructure-dev-server-status.command.ts"
import {
  type DevServerRecord,
  devServerTsvLine,
  recordFromState,
  stoppedRecord,
} from "akasha/infrastructure/services/web-apps/dev-server-recording/dev-server-recording.module.code.ts"
import {
  type DevServerState,
  isPidAlive,
  listStateFiles,
  lookupApp,
  readStateFile,
} from "akasha/infrastructure/services/web-apps/dev-server-stating/dev-server-stating.module.code.ts"

type Named = {
  readonly seq: number | null
  readonly app: string | null
  readonly json: boolean
}

function reading(read: Named, root: string): Answer {
  const recorded = (state: DevServerState): DevServerRecord =>
    recordFromState(state, isPidAlive(state.pid))
  let records: readonly DevServerRecord[]
  if (read.seq !== null && read.app !== null) {
    lookupApp(root, read.app)
    const state = readStateFile(read.seq, read.app)
    records = state === null ? [stoppedRecord(read.seq, read.app)] : [recorded(state)]
  } else if (read.seq === null && read.app === null) {
    records = listStateFiles().map(recorded)
  } else {
    records = listStateFiles()
      .map(recorded)
      .filter((one) => (read.seq !== null ? one.seq === read.seq : one.app === read.app))
  }
  if (read.json) return asJson(records)
  return told(records.map(devServerTsvLine))
}

export async function infrastructureDevServerStatus(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [json, seq, webApp])
  if ("refused" in read) return refusedBy(read.refused)
  try {
    return reading(
      { seq: read.taken.seq ?? null, app: read.taken.webApp ?? null, json: read.taken.json },
      given.root
    )
  } catch (thrown) {
    return refused(whyOf(thrown), codeOf(thrown))
  }
}
