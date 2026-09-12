import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { port } from "akasha/commands/arguments/pages/port.argument.ts"
import { seq } from "akasha/commands/arguments/pages/seq.argument.ts"
import { webApp } from "akasha/commands/arguments/pages/web-app.argument.ts"
import {
  answering,
  keeping,
  OK,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  starting,
  stopping,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-running/dev-server-running.module.code.ts"
import { infrastructureDevServerRestart as page } from "akasha/commands/pages/infrastructure/dev-server/restart/infrastructure-dev-server-restart.command.ts"
import { namingApps } from "akasha/infrastructure/services/web-apps/dev-server-stating/dev-server-stating.module.code.ts"

export async function infrastructureDevServerRestart(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [json, seq, webApp, port])
  if ("refused" in read) return refusedBy(namingApps(read.refused, given.root, webApp.said))
  const named = { root: given.root, seq: read.taken.seq, app: read.taken.webApp }
  return await answering(async (done) => {
    const stopped = await stopping({ ...named, all: false, json: false }, done)
    if (stopped.code !== OK) return keeping(done, stopped)
    return keeping(
      done,
      await starting({ ...named, port: read.taken.port ?? null, json: read.taken.json }, done)
    )
  })
}
