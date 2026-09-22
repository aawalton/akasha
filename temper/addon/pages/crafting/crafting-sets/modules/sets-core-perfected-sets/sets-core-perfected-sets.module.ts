import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCorePerfectedSets = {
  id: "01a061fc-ceeb-71fc-bced-c9b4d1f3537a",
  type: "page-type/module",
  slug: "sets-core-perfected-sets",
  definition: "which set is the perfected twin of which, and the zone each of the pair drops in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A pair is only recorded when both set ids and both zone ids are known.",
    },
  ],
} as const satisfies Module
