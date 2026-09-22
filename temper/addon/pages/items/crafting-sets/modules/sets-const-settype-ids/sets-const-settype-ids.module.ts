import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsConstSettypeIds = {
  id: "01a0c581-b332-7fc7-b2d9-bc6ccd3d4167",
  type: "page-type/module",
  slug: "sets-const-settype-ids",
  definition: "each kind of gear set's number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A module reading a set type number imports that number from here.",
    },
  ],
} as const satisfies Module
