import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakCollectiblesMounts = {
  id: "01a06115-1ac5-7e5c-8d3a-faa3aae9eba1",
  type: "page-type/module",
  slug: "tweak-collectibles-mounts",
  definition: "the mount list whose favourites the interface tweaks mark",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No shared guard stands behind the table guards here.",
    },
  ],
  createdAt: "2026-09-02T07:46:08.197Z",
  updatedAt: "2026-09-22T13:45:15.000Z",
} as const satisfies Module
