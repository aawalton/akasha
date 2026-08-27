import { join } from "node:path"
import type { AddonInfo } from "@temper/shared-build-deploy-addons-resolve"
import type { DeployableInfo } from "@temper/shared-build-deploy-addons-resolve/deployables"
import type { Graph } from "../../../../tools/lib/graph/types.ts"
import { BUILD_TOOLING_SEEDS, packageSeedForAddonDir } from "./check-configs-addons-seeds"
import { importGraphClosureFiles } from "./workflow-seed-files"

export const ADDON_BUILD_CONCURRENCY = 4

export const deployableAddonDirs = (
  deployable: DeployableInfo,
  roster: readonly AddonInfo[]
): readonly string[] => {
  const addon = roster.find((a) => a.canonicalName === deployable.name)
  if (addon === undefined) {
    throw new Error(`addon-build-cache: addon "${deployable.name}" not found in roster`)
  }
  return [addon.dir]
}

export const deployableSeeds = (
  deployable: DeployableInfo,
  roster: readonly AddonInfo[]
): readonly string[] => {
  const ownSeeds = deployableAddonDirs(deployable, roster).map(packageSeedForAddonDir)
  return [...new Set([...ownSeeds, ...BUILD_TOOLING_SEEDS])].sort()
}

export const closureFilesForDeployable = (
  graph: Graph,
  deployable: DeployableInfo,
  roster: readonly AddonInfo[]
): readonly string[] => {
  const files = new Set<string>(importGraphClosureFiles(graph, deployableSeeds(deployable, roster)))
  files.add("bun.lock")
  return [...files].sort()
}

export const missingSeeds = (graph: Graph, seeds: readonly string[]): readonly string[] =>
  seeds.filter((s) => graph.node(s) === undefined)

export const cacheTarPath = (cacheDir: string, name: string, hash: string): string =>
  join(cacheDir, `${name}-${hash}.tar`)
