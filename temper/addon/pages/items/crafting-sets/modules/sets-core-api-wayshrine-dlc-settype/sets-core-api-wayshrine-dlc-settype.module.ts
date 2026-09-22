import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreApiWayshrineDlcSettype = {
  id: "01a06231-8f1c-7200-9fb9-2df4b2450fce",
  type: "page-type/module",
  slug: "sets-core-api-wayshrine-dlc-settype",
  definition: "a set's wayshrines, its zones, the DLC it arrived with and the type it is",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "Each lookup this module offers is independent of every other lookup.",
    },
  ],
} as const satisfies Module
