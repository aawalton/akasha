import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const catalogPayload = {
  id: "01a06071-0c78-7ec6-a529-55cd1d262309",
  type: "module",
  slug: "catalog-payload",
  definition: "the shape of everything the catalog add-on saves out of the game's reference data",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field name here is the name the add-on writes into the saved variables.",
    },
    {
      invariantKind: "departure",
      statement: "Every catalog field is empty until that catalog is collected.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here has code that runs.",
    },
  ],
} as const satisfies Module
