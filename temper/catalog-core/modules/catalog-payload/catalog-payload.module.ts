import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogPayload = {
  id: "01a06071-0c78-7ec6-a529-55cd1d262309",
  type: "page-type/module",
  slug: "catalog-payload",
  definition: "the shape of everything the catalog add-on saves out of the game's reference data",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field name here is the name the add-on writes into the saved variables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every catalog field is empty until that catalog is collected.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here has code that runs.",
    },
  ],
} as const satisfies Module
