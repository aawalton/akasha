import {
  keeping,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Taking } from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import {
  ALL,
  APP,
  JSON_LINE,
  readIn,
  SEQ,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import {
  stoppedBy,
  stopping,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-running/dev-server-running.module.code.ts"

export const TAKING: Taking = {
  flags: [SEQ, APP, ALL, JSON_LINE],
  names: "one-or-every",
}

export async function infrastructureDevServerStop(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = readIn(argv, given.root, TAKING)
  if ("refused" in read) return refusedBy(read.refused)
  const done: string[] = []
  try {
    return keeping(
      done,
      await stopping(
        { root: given.root, seq: read.seq, app: read.app, all: read.all, json: read.json },
        done
      )
    )
  } catch (thrown) {
    return stoppedBy(done, thrown)
  }
}
