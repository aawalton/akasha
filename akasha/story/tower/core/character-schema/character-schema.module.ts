import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const characterSchema = {
  id: "01a05bc6-fa4a-7001-881a-b1da2aa18088",
  pageTypeSlug: "module",
  slug: "character-schema",
  definition: "the shape a character sheet is stored in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The eight attributes are each named rather than held as a map.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute the shape does not name is not admitted.",
    },
    {
      invariantKind: "departure",
      statement: "A sheet carries the fields the shape does not name rather than losing them.",
    },
    {
      invariantKind: "departure",
      statement: "Most of what a sheet may carry is optional.",
    },
  ],
} as const satisfies Module
