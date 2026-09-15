import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { everyServer } from "akasha/command/arguments/pages/every-server.argument.ts"
import { json } from "akasha/command/arguments/pages/json.argument.ts"
import { seq } from "akasha/command/arguments/pages/seq.argument.ts"
import { webApp } from "akasha/command/arguments/pages/web-app.argument.ts"
import {
  answering,
  keeping,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { stopping } from "akasha/command/pages/infrastructure/dev-server/modules/dev-server-running/dev-server-running.module.code.ts"
import { infrastructureDevServerStop as page } from "akasha/command/pages/infrastructure/dev-server/stop/infrastructure-dev-server-stop.command.ts"

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
