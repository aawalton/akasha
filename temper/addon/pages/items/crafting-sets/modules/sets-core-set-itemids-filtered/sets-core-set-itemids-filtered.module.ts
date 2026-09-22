import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreSetItemidsFiltered = {
  id: "01a061fc-ceec-7456-9d7d-84602a2f2336",
  type: "page-type/module",
  slug: "sets-core-set-itemids-filtered",
  definition: "keeping only the item ids of a set that match the equip, trait or enchant wanted",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An armor type and a weapon type may not both be asked for at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Matching a filter costs one built item link per item id.",
    },
  ],
} as const satisfies Module
