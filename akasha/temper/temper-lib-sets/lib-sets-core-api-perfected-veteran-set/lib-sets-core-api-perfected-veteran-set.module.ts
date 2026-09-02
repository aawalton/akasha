import type { Module } from "@akasha/code-system/module"

export const libSetsCoreApiPerfectedVeteranSet = {
  id: "01a061fc-ceed-7641-95c2-68e8bbf2731c",
  pageTypeSlug: "module",
  slug: "lib-sets-core-api-perfected-veteran-set",
  definition: "whether a set is perfected, veteran, or outside the game's own set ids",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The published key GetPerfectedSetId is assigned again with a different function.",
    },
  ],
} as const satisfies Module
