import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const revealed = {
  id: "01a05b71-e544-7b78-bd2c-73da9bb84dcc",
  type: "page-type/module",
  slug: "revealed",
  definition: "the part of an entity's sheet a player may see",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the code does not name can never be revealed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Narrowing a sheet is checked against the schema again before the narrowing is handed back.",
    },
  ],
  createdAt: "2026-09-01T05:29:46.052Z",
  updatedAt: "2026-09-15T18:37:21.000Z",
} as const satisfies Module
