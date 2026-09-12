import { existsSync } from "node:fs"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { seq } from "akasha/commands/arguments/pages/seq.argument.ts"
import { webApp } from "akasha/commands/arguments/pages/web-app.argument.ts"
import {
  codeOf,
  INPUT,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { infrastructureDevServerBootstrap as page } from "akasha/commands/pages/infrastructure/dev-server/bootstrap/infrastructure-dev-server-bootstrap.command.ts"
import {
  resolveEnvLocalPath,
  writeEnvLocalFromPages,
} from "akasha/infrastructure/services/web-apps/dev-server-env-writing/dev-server-env-writing.module.code.ts"
import { namingApps } from "akasha/infrastructure/services/web-apps/dev-server-stating/dev-server-stating.module.code.ts"
import { resolveWorktreePath } from "akasha/infrastructure/services/web-apps/dev-server-worktree/dev-server-worktree.module.code.ts"

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
    return refused(`${envPath} is there already — say \`${force.said}\` to write over it`, INPUT)
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
  const read = takenFor(argv, given.calledAs, page, [json, force, seq, webApp])
  if ("refused" in read) return refusedBy(namingApps(read.refused, given.root, webApp.said))
  try {
    return await bootstrapping({
      root: given.root,
      seq: read.taken.seq,
      app: read.taken.webApp,
      force: read.taken.force,
      json: read.taken.json,
    })
  } catch (thrown) {
    return refused(whyOf(thrown), codeOf(thrown))
  }
}
