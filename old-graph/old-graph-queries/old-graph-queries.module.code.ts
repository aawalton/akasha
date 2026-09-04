import { oldGraphGone } from "../old-graph-gone/old-graph-gone.module.code.ts"
import type { Graph, Node, NodeId } from "../old-graph-types/old-graph-types.module.code.ts"

export type Repo = NonNullable<Node["repo"]>

export type ClosureMembership =
  | { readonly kind: "all" }
  | { readonly kind: "none" }
  | { readonly kind: "reached"; readonly reached: ReadonlySet<NodeId> }

export type ClosureSeeds = {
  readonly nodes?: readonly NodeId[]
  readonly nodeTypes?: readonly PopulationEntry[]
  readonly closurePolicy?: "import-graph"
}

export type PopulationEntry = string | ScopedPopulation

export type ScopedPopulation = {
  readonly kind: string
  readonly under: string
}

export const MEMBERSHIP_ALL: ClosureMembership = { kind: "all" }

export const membershipCoversPath: (
  graph: Graph,
  membership: ClosureMembership,
  path: string,
  repo?: Repo
) => boolean = () => oldGraphGone("membershipCoversPath")
export const pathsStandingNowhere: (
  graph: Graph,
  paths: readonly string[],
  repo?: Repo
) => readonly string[] = () => oldGraphGone("pathsStandingNowhere")
export const resolveClosureMembership: (graph: Graph, seeds: ClosureSeeds) => ClosureMembership =
  () => oldGraphGone("resolveClosureMembership")

export type SeedFiles = {
  readonly name: string
  readonly files: readonly SeedFile[]
}

export type SeedFile = {
  readonly repo: Repo
  readonly path: string
}

export type SeedSet = {
  readonly nodes?: readonly NodeId[]
  readonly nodeTypes?: readonly PopulationEntry[]
}

export type SeedSource = SeedSet & {
  readonly name: string
  readonly package?: string
  readonly steps?: readonly SeedSet[]
  readonly policy?: "import-graph"
}

export const seedFilesFor: (graph: Graph, sources: readonly SeedSource[]) => readonly SeedFiles[] =
  () => oldGraphGone("seedFilesFor")

export type TransitiveClosureOpts = {
  readonly edgeTypes?: readonly string[]
}

export const transitiveClosure: (
  graph: Graph,
  from: NodeId,
  opts?: TransitiveClosureOpts
) => ReadonlySet<NodeId> = () => oldGraphGone("transitiveClosure")
