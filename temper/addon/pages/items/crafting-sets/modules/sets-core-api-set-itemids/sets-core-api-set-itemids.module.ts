import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreApiSetItemids = {
  id: "01a06231-8f1d-7c99-9721-18a5a7b3181e",
  type: "page-type/module",
  slug: "sets-core-api-set-itemids",
  definition: "the item ids of a set, narrowed by equip, trait, armor, weapon or enchant type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "GetSetFirstItemId is the same function as GetSetItemId under another published key.",
    },
  ],
  createdAt: "2026-09-02T12:56:50.205Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
