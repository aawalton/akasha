import { existsSync } from "node:fs"
import { exitCodeForThrowable } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Taking } from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import {
  APP,
  readIn,
  SEQ,
  TAIL,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import { lastLinesOf } from "akasha/commands/pages/infrastructure/dev-server/logs/last-lines/last-lines.module.code.ts"
import {
  logFilePath,
  lookupApp,
} from "akasha/infrastructure/services/web-apps/dev-server-stating/dev-server-stating.module.code.ts"

export const TAKING: Taking = {
  flags: [SEQ, APP, TAIL],
  names: "one-server",
}

async function tailing(read: {
  root: string
  seq: number
  app: string
  tail: number
}): Promise<Answer> {
  lookupApp(read.root, read.app)
  const path = logFilePath(read.seq, read.app)
  if (!existsSync(path)) {
    return refused(`no log file is at ${path} — has the server ever been started?`, 2)
  }
  return { report: await lastLinesOf(path, read.tail), refusals: [], code: 0 }
}

export async function infrastructureDevServerLogs(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = readIn(argv, given.root, TAKING)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return await tailing({
      root: given.root,
      seq: read.seq ?? 0,
      app: read.app ?? "",
      tail: read.tail,
    })
  } catch (thrown) {
    const carried = exitCodeForThrowable(thrown)
    return refused(whyOf(thrown), carried === 70 ? 3 : carried)
  }
}
