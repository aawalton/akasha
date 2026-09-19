import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { commit } from "akasha/command/argument/pages/commit.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { port } from "akasha/command/argument/pages/port.argument.ts"
import { webApp } from "akasha/command/argument/pages/web-app.argument.ts"
import {
  answering,
  keeping,
  OK,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  starting,
  stopping,
} from "akasha/command/pages/infrastructure/dev-server/modules/dev-server-running/dev-server-running.module.code.ts"
import { infrastructureDevServerRestart as page } from "akasha/command/pages/infrastructure/dev-server/restart/infrastructure-dev-server-restart.command.ts"
import { namingApps } from "akasha/infrastructure/service/web-app/modules/dev-server-stating/dev-server-stating.module.code.ts"
import { commitNamed } from "akasha/infrastructure/service/web-app/modules/dev-server-tree/dev-server-tree.module.code.ts"

export async function infrastructureDevServerRestart(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [commit, json, webApp, port])
  if ("refused" in read) return refusedBy(namingApps(read.refused, given.root, webApp.said))
  const named = {
    root: given.root,
    commit: commitNamed(given.root, read.taken.commit),
    app: read.taken.webApp,
  }
  return await answering(async (done) => {
    const stopped = await stopping({ ...named, all: false, json: false }, done)
    if (stopped.code !== OK) return keeping(done, stopped)
    return keeping(
      done,
      await starting({ ...named, port: read.taken.port ?? null, json: read.taken.json }, done)
    )
  })
}
