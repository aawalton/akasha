import {
  codeOf,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Taking } from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import {
  APP,
  JSON_LINE,
  PORT,
  readIn,
  SEQ,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import { starting } from "akasha/commands/pages/infrastructure/dev-server/dev-server-running/dev-server-running.module.code.ts"

export const TAKING: Taking = {
  flags: [SEQ, APP, PORT, JSON_LINE],
  names: "one-server",
}

export async function infrastructureDevServerStart(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = readIn(argv, given.root, TAKING)
  if ("refused" in read) return refusedBy(read.refused)
  try {
    return await starting({
      root: given.root,
      seq: read.seq ?? 0,
      app: read.app ?? "",
      port: read.port,
      json: read.json,
    })
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], codeOf(thrown))
  }
}
