import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const revealed = {
  id: "01a05b71-e544-7b78-bd2c-73da9bb84dcc",
  pageTypeSlug: "module",
  slug: "revealed",
  definition: "the part of an entity's sheet a player may see",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key the code does not name can never be revealed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Narrowing a sheet is checked against the schema again before the narrowing is handed back.",
    },
  ],
} as const satisfies Module
