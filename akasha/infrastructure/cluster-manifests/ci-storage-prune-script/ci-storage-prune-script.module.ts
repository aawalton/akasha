import type { Module } from "@akasha/code-system/module"

export const ciStoragePruneScript = {
  id: "01a06810-1262-7925-82d5-e760e3ab630b",
  pageTypeSlug: "module",
  slug: "ci-storage-prune-script",
  definition: "the shell script that clears what a pipeline left on a node's disk",
  code: "ts",
} as const satisfies Module
