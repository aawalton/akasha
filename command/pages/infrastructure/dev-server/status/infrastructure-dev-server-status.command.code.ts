import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { commit } from "akasha/command/argument/pages/commit.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { webApp } from "akasha/command/argument/pages/web-app.argument.ts"
import {
  asJson,
  codeOf,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { infrastructureDevServerStatus as page } from "akasha/command/pages/infrastructure/dev-server/status/infrastructure-dev-server-status.command.ts"
import {
  type DevServerRecord,
  devServerTsvLine,
  recordFromState,
  stoppedRecord,
} from "akasha/infrastructure/service/web-app/modules/dev-server-recording/dev-server-recording.module.code.ts"
import {
  type DevServerState,
  isPidAlive,
  listStateFiles,
  lookupApp,
  readStateFile,
} from "akasha/infrastructure/service/web-app/modules/dev-server-stating/dev-server-stating.module.code.ts"
import { commitNamed } from "akasha/infrastructure/service/web-app/modules/dev-server-tree/dev-server-tree.module.code.ts"

type Named = {
  readonly commit: string | null
  readonly app: string | null
  readonly json: boolean
}

function reading(read: Named, root: string): Answer {
  const recorded = (state: DevServerState): DevServerRecord =>
    recordFromState(state, isPidAlive(state.pid))
  let records: readonly DevServerRecord[]
  if (read.commit !== null && read.app !== null) {
    lookupApp(root, read.app)
    const state = readStateFile(read.commit, read.app)
    records = state === null ? [stoppedRecord(read.commit, read.app)] : [recorded(state)]
  } else if (read.commit === null && read.app === null) {
    records = listStateFiles().map(recorded)
  } else {
    records = listStateFiles()
      .map(recorded)
      .filter((one) => (read.commit !== null ? one.commit === read.commit : one.app === read.app))
  }
  if (read.json) return asJson(records)
  return told(records.map(devServerTsvLine))
}

export async function infrastructureDevServerStatus(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [commit, json, webApp])
  if ("refused" in read) return refusedBy(read.refused)
  try {
    const said = read.taken.commit
    return reading(
      {
        commit: said === undefined ? null : commitNamed(given.root, said),
        app: read.taken.webApp ?? null,
        json: read.taken.json,
      },
      given.root
    )
  } catch (thrown) {
    return refused(whyOf(thrown), codeOf(thrown))
  }
}
