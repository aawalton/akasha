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
    {
      invariantKind: "departure",
      statement: "A formula reading a refused formula is refused too.",
    },
    {
      invariantKind: "departure",
      statement: "A formula reading a refused formula checks clean on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal darkens every key reading a key that refusal darkens.",
    },
    {
      invariantKind: "departure",
      statement: "One refusal names every key the refusal darkens.",
    },
    {
      invariantKind: "departure",
      statement: "A darkened key works out to nothing however clean the formula reads.",
    },
  ],
} as const satisfies Module
