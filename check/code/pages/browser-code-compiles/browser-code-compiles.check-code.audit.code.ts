import {
  appsAmong,
  judgedFor,
} from "akasha/check/code/pages/browser-code-compiles/browser-code-compiles.check-code.decision.code.ts"
import { browserRefusalsFor } from "akasha/check/code/pages/typecheck/typecheck.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { placingOver } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { routerApp } from "akasha/code/router-app/router-app.page-type.ts"

export async function browserCodeCompiles(root: string): Promise<readonly Judged[]> {
  const commit = commitIn(root)
  const index = commit.index
  const apps = appsAmong(index.everyOfType(routerApp.slug).map((one) => one.path))
  const manifests = [...new Set([...index.manifestsBeside(index.fileKeysAt()), ...commit.paths])]
  const [judged, browser] = await Promise.all([
    judgedFor(apps, {
      root: commit.root,
      paths: commit.paths,
      changed: [],
      read: commit.read,
      laid: commit.bytes,
      placed: placingOver(manifests, commit.read),
    }),
    browserRefusalsFor(commit.root, commit.paths, commit.read, index),
  ])
  return [...judged, ...browser]
}
