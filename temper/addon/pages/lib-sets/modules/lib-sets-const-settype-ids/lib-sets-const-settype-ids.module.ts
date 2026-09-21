import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsConstSettypeIds = {
  id: "01a0c581-b332-7fc7-b2d9-bc6ccd3d4167",
  type: "page-type/module",
  slug: "lib-sets-const-settype-ids",
  definition: "the number each kind of gear set is known by, set as a game global",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A module reading a set type global imports this one, which sets them all.",
    },
  ],
} as const satisfies Module
