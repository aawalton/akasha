import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const maintainability = {
  id: "01a0680f-d1b7-7fad-a8e1-931817f12d1a",
  type: "module",
  slug: "maintainability",
  definition: "the maintainability index a source file works out to",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file with no function measures one hundred.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index below zero is answered as zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A source line is a line some token starts on.",
    },
  ],
} as const satisfies Module
