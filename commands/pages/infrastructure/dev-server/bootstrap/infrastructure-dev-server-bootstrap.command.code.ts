import { existsSync } from "node:fs"
import {
  codeOf,
  INPUT,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Taking } from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import {
  APP,
  FORCE,
  JSON_LINE,
  readIn,
  SEQ,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import {
  resolveEnvLocalPath,
  writeEnvLocalFromPages,
} from "akasha/infrastructure/services/web-apps/dev-server-env-writing/dev-server-env-writing.module.code.ts"
import { resolveWorktreePath } from "akasha/infrastructure/services/web-apps/dev-server-worktree/dev-server-worktree.module.code.ts"

export const TAKING: Taking = {
  flags: [SEQ, APP, FORCE, JSON_LINE],
  names: "one-server",
}

async function bootstrapping(read: {
  root: string
  seq: number
  app: string
  force: boolean
  json: boolean
}): Promise<Answer> {
  const worktreePath = await resolveWorktreePath(read.seq)
  const envPath = resolveEnvLocalPath(read.root, worktreePath, read.app)
  if (existsSync(envPath) && !read.force) {
    return refused(`${envPath} is there already — say \`${FORCE}\` to write over it`, INPUT)
  }
  const written = writeEnvLocalFromPages({
    root: read.root,
    worktreePath,
    appName: read.app,
  })
  const report = read.json
    ? [JSON.stringify({ ok: true, path: written.path, var_count: written.varCount })]
    : [`wrote ${written.path} (${written.varCount} vars)`]
  return told(report)
}

export async function infrastructureDevServerBootstrap(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = readIn(argv, given.root, TAKING)
  if ("refused" in read) return refusedBy(read.refused)
  try {
    return await bootstrapping({
      root: given.root,
      seq: read.seq ?? 0,
      app: read.app ?? "",
      force: read.force,
      json: read.json,
    })
  } catch (thrown) {
    return refused(whyOf(thrown), codeOf(thrown))
  }
}
