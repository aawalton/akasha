import type { Module } from "@akasha/code-system/module"

export const formulaCheck = {
  id: "01a05c11-6371-7006-92d5-cb334a226642",
  pageTypeSlug: "module",
  slug: "formula-check",
  definition: "whether a formula's types meet, what it reads, and whether its keys ring",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A formula is checked when the page type carrying that formula is checked.",
    },
    {
      invariantKind: "departure",
      statement: "A formula naming a key its page type does not declare is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A formula whose types do not meet is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A formula answering a kind other than its property's declared type is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A cycle among one page type's formulas is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Both sides of `??` must be of one type.",
    },
  ],
} as const satisfies Module
