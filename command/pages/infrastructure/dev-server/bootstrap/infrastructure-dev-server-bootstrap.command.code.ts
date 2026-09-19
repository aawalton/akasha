import { existsSync } from "node:fs"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { commit } from "akasha/command/argument/pages/commit.argument.ts"
import { force } from "akasha/command/argument/pages/force.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { webApp } from "akasha/command/argument/pages/web-app.argument.ts"
import {
  answering,
  INPUT,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { infrastructureDevServerBootstrap as page } from "akasha/command/pages/infrastructure/dev-server/bootstrap/infrastructure-dev-server-bootstrap.command.ts"
import {
  resolveEnvLocalPath,
  writeEnvLocalFromPages,
  wroteEnvSaid,
} from "akasha/infrastructure/service/web-app/modules/dev-server-env-writing/dev-server-env-writing.module.code.ts"
import { namingApps } from "akasha/infrastructure/service/web-app/modules/dev-server-stating/dev-server-stating.module.code.ts"
import {
  commitNamed,
  treeLaidDown,
} from "akasha/infrastructure/service/web-app/modules/dev-server-tree/dev-server-tree.module.code.ts"

export type Read = {
  readonly root: string
  readonly commit: string
  readonly app: string
  readonly force: boolean
  readonly json: boolean
}

export type Bootstrapping = (done: string[], read: Read) => Promise<Answer>

async function bootstrapped(done: string[], read: Read): Promise<Answer> {
  const treePath = treeLaidDown(read.root, read.commit)
  const envPath = resolveEnvLocalPath(read.root, treePath, read.app)
  if (existsSync(envPath) && !read.force) {
    return refused(`${envPath} is there already — say \`${force.said}\` to write over it`, INPUT)
  }
  const written = writeEnvLocalFromPages({
    root: read.root,
    worktreePath: treePath,
    appName: read.app,
  })
  done.push(wroteEnvSaid(written.path, written.varCount))
  const report = read.json
    ? [JSON.stringify({ ok: true, path: written.path, var_count: written.varCount })]
    : [`wrote ${written.path} (${written.varCount} vars)`]
  return told(report)
}

export async function infrastructureDevServerBootstrap(
  argv: readonly string[],
  given: Given,
  bootstrapping: Bootstrapping = bootstrapped
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [json, force, commit, webApp])
  if ("refused" in read) return refusedBy(namingApps(read.refused, given.root, webApp.said))
  return await answering(
    async (done) =>
      await bootstrapping(done, {
        root: given.root,
        commit: commitNamed(given.root, read.taken.commit),
        app: read.taken.webApp,
        force: read.taken.force,
        json: read.taken.json,
      })
  )
}
