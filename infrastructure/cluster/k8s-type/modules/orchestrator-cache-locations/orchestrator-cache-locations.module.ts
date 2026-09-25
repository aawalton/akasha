import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const orchestratorCacheLocations = {
  id: "01a06735-dd9c-700a-8ad6-ed91c294657a",
  type: "page-type/module",
  slug: "orchestrator-cache-locations",
  definition: "where each web app keeps its checkout cache on a node",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The git service's origin and the settings handing git the token are named here once.",
    },
  ],
} as const satisfies Module
