import {
  type ClosureMembership,
  type ClosureSeeds,
  membershipCoversPath,
  resolveClosureMembership,
} from "@akasha/old-graph/old-graph-queries"
import type { Graph } from "@akasha/old-graph/old-graph-types"

const CODE_REPO = "code"

export const membershipIntersectsPaths = (
  graph: Graph,
  membership: ClosureMembership,
  paths: readonly string[]
): boolean => {
  if (membership.kind === "all") return true
  if (membership.kind === "none") return false
  return paths.some((path) => membershipCoversPath(graph, membership, path, CODE_REPO))
}

export const closureIntersectsChangedFiles = (
  graph: Graph,
  seeds: ClosureSeeds,
  changedFiles: readonly string[]
): boolean => membershipIntersectsPaths(graph, resolveClosureMembership(graph, seeds), changedFiles)
