import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const questSchema = {
  id: "01a05b71-e544-7f7a-9dc9-b1677b4e1fc6",
  pageTypeSlug: "module",
  slug: "quest-schema",
  definition: "a quest a game is tracking and whether it is still running",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A quest stored as offered reads back as active.",
    },
  ],
} as const satisfies Module
