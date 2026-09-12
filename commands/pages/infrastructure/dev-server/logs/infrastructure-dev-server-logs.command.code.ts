import { existsSync } from "node:fs"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { seq } from "akasha/commands/arguments/pages/seq.argument.ts"
import { tail } from "akasha/commands/arguments/pages/tail.argument.ts"
import { webApp } from "akasha/commands/arguments/pages/web-app.argument.ts"
import {
  codeOf,
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { infrastructureDevServerLogs as page } from "akasha/commands/pages/infrastructure/dev-server/logs/infrastructure-dev-server-logs.command.ts"
import { lastLinesOf } from "akasha/commands/pages/infrastructure/dev-server/logs/last-lines/last-lines.module.code.ts"
import {
  logFilePath,
  lookupApp,
  namingApps,
} from "akasha/infrastructure/services/web-apps/dev-server-stating/dev-server-stating.module.code.ts"

async function tailing(read: {
  root: string
  seq: number
  app: string
  tail: number
}): Promise<Answer> {
  lookupApp(read.root, read.app)
  const path = logFilePath(read.seq, read.app)
  if (!existsSync(path)) {
    return refused(`no log file is at ${path} — has the server ever been started?`, DATA)
  }
  return told(await lastLinesOf(path, read.tail))
}

export async function infrastructureDevServerLogs(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [seq, webApp, tail])
  if ("refused" in read) return refusedBy(namingApps(read.refused, given.root, webApp.said))
  if (read.taken.tail === 0) {
    return refusedBy([`\`${tail.said}\` names a whole number above nothing, and \`0\` is not`])
  }
  try {
    return await tailing({
      root: given.root,
      seq: read.taken.seq,
      app: read.taken.webApp,
      tail: read.taken.tail,
    })
  } catch (thrown) {
    return refused(whyOf(thrown), codeOf(thrown))
  }
}
