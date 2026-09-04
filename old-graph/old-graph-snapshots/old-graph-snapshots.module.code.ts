import type { Repo } from "@akasha/pages-system/markdown-document"
import { oldGraphGone } from "../old-graph-gone/old-graph-gone.module.code.ts"
import type { BuildContext, Engine, Graph } from "../old-graph-types/old-graph-types.module.code.ts"

export type SnapshotIdentity = {
  readonly commit: string
  readonly repos: Readonly<Partial<Record<Repo, string>>>
}

export type SnapshotHolder = {
  readonly at: (commit: string) => Promise<HeldSnapshot>
  readonly held: () => readonly string[]
}

export type HeldSnapshot = {
  readonly identity: SnapshotIdentity
  readonly graph: Graph
}

export type SnapshotReading = {
  readonly identity: SnapshotIdentity
  readonly ctx: BuildContext
}

export const HELD_AT_ONCE = 4

export const identityKey: (identity: SnapshotIdentity) => string = () => oldGraphGone("identityKey")
export const identityOf: (ctx: BuildContext) => SnapshotIdentity = () => oldGraphGone("identityOf")

export const buildFrom: (ctx: BuildContext) => Promise<Graph> = () => oldGraphGone("buildFrom")
export const createSnapshotHolder: (
  read?: (commit: string) => SnapshotReading,
  build?: (ctx: BuildContext) => Promise<Graph>
) => SnapshotHolder = () => oldGraphGone("createSnapshotHolder")
export const readAt: (commit: string) => SnapshotReading = () => oldGraphGone("readAt")

export const applyRegistrars: (engine: Engine, paths: readonly string[]) => Promise<undefined> =
  () => oldGraphGone("applyRegistrars")
export const assembleEngine: (root?: string) => Promise<Engine> = () =>
  oldGraphGone("assembleEngine")
export const buildSnapshot: (commit: string) => Promise<Graph> = () => oldGraphGone("buildSnapshot")
export const producerPaths: (root: string) => readonly string[] = () =>
  oldGraphGone("producerPaths")
export const registerProducers: (engine: Engine, paths: readonly string[]) => Promise<undefined> =
  () => oldGraphGone("registerProducers")
export const registrarPaths: (root: string) => readonly string[] = () =>
  oldGraphGone("registrarPaths")
