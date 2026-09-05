import type { Module } from "@akasha/code-system/module"

export const registryGcManifests = {
  id: "01a073af-3331-7e46-9dcb-a64d98dd4e67",
  pageTypeSlug: "module",
  slug: "registry-gc-manifests",
  definition: "the job that drops an image layer and tag nothing refers to",
  code: "ts",
} as const satisfies Module
