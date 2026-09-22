import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreApiPerfectedVeteranSet = {
  id: "01a061fc-ceed-7641-95c2-68e8bbf2731c",
  type: "page-type/module",
  slug: "sets-core-api-perfected-veteran-set",
  definition: "whether a set is perfected, veteran, or outside the game's own set ids",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The published key GetPerfectedSetId is assigned again with a different function.",
    },
  ],
} as const satisfies Module
