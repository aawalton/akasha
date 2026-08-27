import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { ScopedNodeTypePopulation } from "../../../../tools/lib/workflow-dsl/types.ts"
import { listAllAddons } from "@temper/shared-build-deploy-addons-resolve"
import { z } from "zod"

export const BUILD_TOOLING_SEEDS: readonly string[] = [
  "package:code:@temper/addons",
  "package:code:@temper/shared-build-deploy-addons-load-order",
]

const packageNameSchema = z.object({ name: z.string() }).passthrough()

export const packageSeedForAddonDir = (addonDir: string): string => {
  const pkgJson: unknown = JSON.parse(readFileSync(join(addonDir, "package.json"), "utf-8"))
  return `package:code:${packageNameSchema.parse(pkgJson).name}`
}

const deriveAddonPackageSeeds = (): readonly string[] => {
  const seeds = new Set<string>(BUILD_TOOLING_SEEDS)
  for (const addon of listAllAddons()) {
    seeds.add(packageSeedForAddonDir(addon.dir))
  }
  return [...seeds].sort()
}

export const ADDON_PACKAGE_SEEDS: readonly string[] = deriveAddonPackageSeeds()

const deriveAddonSourcePopulation = (): readonly ScopedNodeTypePopulation[] => {
  const roots = listAllAddons()
    .map((addon) => `${addon.repoRelDir}/src`)
    .sort()
  return roots.flatMap((under) => [
    { kind: "ts-file", under },
    { kind: "tsx-file", under },
  ])
}

export const ADDON_SOURCE_POPULATION: readonly ScopedNodeTypePopulation[] =
  deriveAddonSourcePopulation()
