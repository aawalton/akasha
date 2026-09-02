import type { Module } from "@akasha/code-system/module"

export const libSetsCoreApiDropZonesSets = {
  id: "01a06231-8f1d-7d70-9ac2-92d18df83cb2",
  pageTypeSlug: "module",
  slug: "lib-sets-core-api-drop-zones-sets",
  definition: "which zones and named locations a set drops in, and which sets drop in a given zone",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "An item id whose link the game cannot name is removed from the cache for this API version.",
    },
  ],
} as const satisfies Module
