import { existsSync } from "node:fs"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { commit } from "akasha/command/argument/pages/commit.argument.ts"
import { tail } from "akasha/command/argument/pages/tail.argument.ts"
import { webApp } from "akasha/command/argument/pages/web-app.argument.ts"
import {
  codeOf,
  DATA,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { infrastructureDevServerLog as page } from "akasha/command/pages/infrastructure/dev-server/log/infrastructure-dev-server-log.command.ts"
import { lastLinesOf } from "akasha/command/pages/infrastructure/dev-server/log/modules/last-lines/last-lines.module.code.ts"
import {
  logFilePath,
  lookupApp,
  namingApps,
} from "akasha/infrastructure/service/web-app/modules/dev-server-stating/dev-server-stating.module.code.ts"
import { commitNamed } from "akasha/infrastructure/service/web-app/modules/dev-server-tree/dev-server-tree.module.code.ts"

async function tailing(read: {
  root: string
  commit: string
  app: string
  tail: number
}): Promise<Answer> {
  lookupApp(read.root, read.app)
  const path = logFilePath(read.commit, read.app)
  if (!existsSync(path)) {
    return refused(`no log file is at ${path} — has the server ever been started?`, DATA)
  }
  return told(await lastLinesOf(path, read.tail))
}

export async function infrastructureDevServerLog(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [commit, webApp, tail])
  if ("refused" in read) return refusedBy(namingApps(read.refused, given.root, webApp.said))
  if (read.taken.tail === 0) {
    return refusedBy([`\`${tail.said}\` names a whole number above nothing, and \`0\` is not`])
  }
  try {
    return await tailing({
      root: given.root,
      commit: commitNamed(given.root, read.taken.commit),
      app: read.taken.webApp,
      tail: read.taken.tail,
    })
  } catch (thrown) {
    return refused(whyOf(thrown), codeOf(thrown))
  }
}
