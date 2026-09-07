import type { Module } from "@akasha/code/module"

export const blankComments = {
  id: "01a06890-2000-7000-9000-000000000001",
  pageTypeSlug: "module",
  slug: "blank-comments",
  definition:
    "a source with its comments blanked out, or with everything but its comments blanked out",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A blanked span keeps the replaced text's length and line breaks.",
    },
    {
      invariantKind: "departure",
      statement: "Every line and column lands where that text sat.",
    },
    {
      invariantKind: "departure",
      statement: "A comment inside a string is no comment.",
    },
    {
      invariantKind: "departure",
      statement: "A source is read as typescript or as shell.",
    },
  ],
} as const satisfies Module
