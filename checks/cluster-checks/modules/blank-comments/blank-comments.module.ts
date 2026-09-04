import type { Module } from "@akasha/code-system/module"

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
      statement:
        "A blanked span keeps the length and the line breaks of what it replaced, so every line and column still lands.",
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
