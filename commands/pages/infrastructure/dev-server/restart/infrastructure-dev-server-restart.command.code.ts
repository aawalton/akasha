import {
  keeping,
  OK,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Taking } from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import {
  APP,
  JSON_LINE,
  PORT,
  readIn,
  SEQ,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import {
  starting,
  stoppedBy,
  stopping,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-running/dev-server-running.module.code.ts"

export const TAKING: Taking = {
  flags: [SEQ, APP, PORT, JSON_LINE],
  names: "one-server",
}

export async function infrastructureDevServerRestart(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = readIn(argv, given.root, TAKING)
  if ("refused" in read) return refusedBy(read.refused)
  const root = given.root
  const seq = read.seq ?? 0
  const app = read.app ?? ""
  const done: string[] = []
  try {
    const stopped = await stopping({ root, seq, app, all: false, json: false }, done)
    if (stopped.code !== OK) return keeping(done, stopped)
    return keeping(done, await starting({ root, seq, app, port: read.port, json: read.json }, done))
  } catch (thrown) {
    return stoppedBy(done, thrown)
  }
}
