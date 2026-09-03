import type { Module } from "@akasha/code-system/module"

export const maintainability = {
  id: "01a0680f-d1b7-7fad-a8e1-931817f12d1a",
  pageTypeSlug: "module",
  slug: "maintainability",
  definition: "the maintainability index a source file works out to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file holding no function measures one hundred.",
    },
    {
      invariantKind: "departure",
      statement: "An index below zero is answered as zero.",
    },
    {
      invariantKind: "departure",
      statement: "A source line is a line some token starts on.",
    },
  ],
} as const satisfies Module
