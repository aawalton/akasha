import { exitCodeForThrowable } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Taking } from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import {
  APP,
  JSON_LINE,
  PORT,
  readIn,
  SEQ,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import {
  starting,
  stopping,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-running/dev-server-running.module.code.ts"

export const TAKING: Taking = {
  flags: [SEQ, APP, PORT, JSON_LINE],
  names: "one-server",
}

export async function infrastructureDevServerRestart(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = readIn(argv, given.root, TAKING)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const root = given.root
  const seq = read.seq ?? 0
  const app = read.app ?? ""
  try {
    const stopped = await stopping({ root, seq, app, all: false, json: false })
    if (stopped.code !== 0) return stopped
    return await starting({ root, seq, app, port: read.port, json: read.json })
  } catch (thrown) {
    const carried = exitCodeForThrowable(thrown)
    return refused(whyOf(thrown), carried === 70 ? 3 : carried)
  }
}
