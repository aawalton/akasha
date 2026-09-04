import type { Repo } from "@akasha/pages-system/markdown-document"
import { oldGraphGone } from "../old-graph-gone/old-graph-gone.module.code.ts"
import type { BuildContext } from "../old-graph-types/old-graph-types.module.code.ts"

export type RepoTree = {
  readonly paths: readonly string[]
  readonly hasFile: (relPath: string) => boolean
  readonly hasDir: (relPath: string) => boolean
  readonly hasPath: (relPath: string) => boolean
}

export const curatedWorkspaces: (ctx: BuildContext) => Readonly<Record<string, unknown>> | null =
  () => oldGraphGone("curatedWorkspaces")
export const repoTree: (ctx: BuildContext, repo: Repo) => RepoTree = () => oldGraphGone("repoTree")
export const workspaceDirsAt: (ctx: BuildContext, repo: Repo) => readonly string[] = () =>
  oldGraphGone("workspaceDirsAt")
