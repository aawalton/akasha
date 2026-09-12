import {
  asJson,
  codeOf,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type {
  Taken,
  Taking,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import {
  APP,
  JSON_LINE,
  readIn,
  SEQ,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
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

export const TAKING: Taking = {
  flags: [SEQ, APP, JSON_LINE],
  names: "any",
}

function reading(read: Taken, root: string): Answer {
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
  const read = readIn(argv, given.root, TAKING)
  if ("refused" in read) return refusedBy(read.refused)
  try {
    return reading(read, given.root)
  } catch (thrown) {
    return refused(whyOf(thrown), codeOf(thrown))
  }
}
