import { exitCodeForThrowable } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Taking } from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import {
  ALL,
  APP,
  JSON_LINE,
  readIn,
  SEQ,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import { stopping } from "akasha/commands/pages/infrastructure/dev-server/dev-server-running/dev-server-running.module.code.ts"

export const TAKING: Taking = {
  flags: [SEQ, APP, ALL, JSON_LINE],
  names: "one-or-every",
}

export async function infrastructureDevServerStop(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = readIn(argv, given.root, TAKING)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return await stopping({
      root: given.root,
      seq: read.seq,
      app: read.app,
      all: read.all,
      json: read.json,
    })
  } catch (thrown) {
    const carried = exitCodeForThrowable(thrown)
    return refused(whyOf(thrown), carried === 70 ? 3 : carried)
  }
}
