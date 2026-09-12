import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { port } from "akasha/commands/arguments/pages/port.argument.ts"
import { seq } from "akasha/commands/arguments/pages/seq.argument.ts"
import { webApp } from "akasha/commands/arguments/pages/web-app.argument.ts"
import {
  answering,
  keeping,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { starting } from "akasha/commands/pages/infrastructure/dev-server/dev-server-running/dev-server-running.module.code.ts"
import { infrastructureDevServerStart as page } from "akasha/commands/pages/infrastructure/dev-server/start/infrastructure-dev-server-start.command.ts"
import { namingApps } from "akasha/infrastructure/services/web-apps/dev-server-stating/dev-server-stating.module.code.ts"

export async function infrastructureDevServerStart(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [json, seq, webApp, port])
  if ("refused" in read) return refusedBy(namingApps(read.refused, given.root, webApp.said))
  return await answering(async (done) =>
    keeping(
      done,
      await starting(
        {
          root: given.root,
          seq: read.taken.seq,
          app: read.taken.webApp,
          port: read.taken.port ?? null,
          json: read.taken.json,
        },
        done
      )
    )
  )
}
