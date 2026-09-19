import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { commit } from "akasha/command/argument/pages/commit.argument.ts"
import { everyServer } from "akasha/command/argument/pages/every-server.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { webApp } from "akasha/command/argument/pages/web-app.argument.ts"
import {
  answering,
  keeping,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { stopping } from "akasha/command/pages/infrastructure/dev-server/modules/dev-server-running/dev-server-running.module.code.ts"
import { infrastructureDevServerStop as page } from "akasha/command/pages/infrastructure/dev-server/stop/infrastructure-dev-server-stop.command.ts"
import { commitNamed } from "akasha/infrastructure/service/web-app/modules/dev-server-tree/dev-server-tree.module.code.ts"

export async function infrastructureDevServerStop(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [commit, json, webApp, everyServer])
  if ("refused" in read) return refusedBy(read.refused)
  const named = read.taken
  const said = named.commit ?? null
  const app = named.webApp ?? null
  if (!named.everyServer && (said === null || app === null)) {
    return refusedBy([
      `this takes \`${everyServer.said}\`, or both \`${commit.said}\` and \`${webApp.said}\``,
    ])
  }
  return await answering(async (done) =>
    keeping(
      done,
      await stopping(
        {
          root: given.root,
          commit: said === null ? null : commitNamed(given.root, said),
          app,
          all: named.everyServer,
          json: named.json,
        },
        done
      )
    )
  )
}
