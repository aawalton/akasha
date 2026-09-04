import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const resolveHero = {
  id: "01a05bc6-fa4a-700f-a4ff-93e249cec531",
  pageTypeSlug: "module",
  slug: "resolve-hero",
  definition: "the illustration a chapter opens with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The illustrations stand beside the saved game rather than at a path of their own.",
    },
    {
      invariantKind: "departure",
      statement: "A game with no illustrations file reads as having none.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter naming no opening beat opens with nothing.",
    },
  ],
} as const satisfies Module
