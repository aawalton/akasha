import { type MobileApp } from "./apps"
import { CODE_BUILD_INPUT_PATHS, type TreeSource } from "./git-tree-hash"
import { simRunSourceRepoPaths } from "./sim-tree"

export interface RepoAt {
  readonly root: string
  readonly ref: string
}

export function buildInputSources(app: MobileApp, code: RepoAt, shell: RepoAt): readonly TreeSource[] {
  return [
    { root: code.root, ref: code.ref, paths: CODE_BUILD_INPUT_PATHS },
    { root: shell.root, ref: shell.ref, paths: simRunSourceRepoPaths(app) },
  ]
}
