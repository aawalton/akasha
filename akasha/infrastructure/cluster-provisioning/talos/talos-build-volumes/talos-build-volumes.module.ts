import type { Module } from "@akasha/code-system/module"

export const talosBuildVolumes = {
  id: "01a06813-7b0f-7967-a791-1f252be3dc58",
  pageTypeSlug: "module",
  slug: "talos-build-volumes",
  definition: "a node's user volumes and ephemeral disk turned into volume-config documents",
  code: "ts",
} as const satisfies Module
