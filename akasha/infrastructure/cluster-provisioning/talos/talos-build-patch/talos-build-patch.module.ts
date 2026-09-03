import type { Module } from "@akasha/code-system/module"

export const talosBuildPatch = {
  id: "01a06813-7b0f-7a67-b8a8-51d1b4874930",
  pageTypeSlug: "module",
  slug: "talos-build-patch",
  definition: "a node and its cluster turned into a Talos machine-config patch",
  code: "ts",
} as const satisfies Module
