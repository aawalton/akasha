import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { everyServer } from "akasha/commands/arguments/pages/every-server.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { seq } from "akasha/commands/arguments/pages/seq.argument.ts"
import { webApp } from "akasha/commands/arguments/pages/web-app.argument.ts"
import {
  answering,
  keeping,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { stopping } from "akasha/commands/pages/infrastructure/dev-server/dev-server-running/dev-server-running.module.code.ts"
import { infrastructureDevServerStop as page } from "akasha/commands/pages/infrastructure/dev-server/stop/infrastructure-dev-server-stop.command.ts"

export async function infrastructureDevServerStop(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [json, seq, webApp, everyServer])
  if ("refused" in read) return refusedBy(read.refused)
  const named = read.taken
  const one = named.seq ?? null
  const app = named.webApp ?? null
  if (!named.everyServer && (one === null || app === null)) {
    return refusedBy([
      `this takes \`${everyServer.said}\`, or both \`${seq.said}\` and \`${webApp.said}\``,
    ])
  }
  return await answering(async (done) =>
    keeping(
      done,
      await stopping(
        { root: given.root, seq: one, app, all: named.everyServer, json: named.json },
        done
      )
    )
  )
}
