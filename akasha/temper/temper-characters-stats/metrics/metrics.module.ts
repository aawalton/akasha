import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metrics = {
  id: "01a06131-abb7-7c5f-81a0-69154a33d704",
  pageTypeSlug: "module",
  slug: "metrics",
  definition:
    "every character stat indexed by its id, with the ones carrying a formula gathered apart",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "This table is gathered from the sixteen data groups in the order the groups are named.",
    },
    {
      invariantKind: "gap",
      statement: "A stat moved to another group changes the order this table answers its ids in.",
    },
  ],
} as const satisfies Module
