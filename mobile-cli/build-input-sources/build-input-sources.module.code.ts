import {
  CODE_BUILD_INPUT_PATHS,
  type TreeSource,
} from "../git-tree-hash/git-tree-hash.module.code.ts"
import type { MobileApp } from "../mobile-app/mobile-app.module.code.ts"
import { simRunSourceRepoPaths } from "../sim-run-tree/sim-run-tree.module.code.ts"

export interface RepoAt {
  readonly root: string
  readonly ref: string
}

export function buildInputSources(
  app: MobileApp,
  code: RepoAt,
  shell: RepoAt
): readonly TreeSource[] {
  return [
    { root: code.root, ref: code.ref, paths: CODE_BUILD_INPUT_PATHS },
    { root: shell.root, ref: shell.ref, paths: simRunSourceRepoPaths(app) },
  ]
}
