import type { Module } from "@akasha/code-system/module"

export const registryGcManifests = {
  id: "01a06810-1263-7a51-b717-9c34e39b183b",
  pageTypeSlug: "module",
  slug: "registry-gc-manifests",
  definition: "the job that drops an image layer and tag nothing refers to",
  code: "ts",
} as const satisfies Module
