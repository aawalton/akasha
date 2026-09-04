import type { Domain } from "../../domains/domains/domain.page-type.ts"

export const personaPoints = {
  id: "01a0675b-16f8-7862-b5f6-3061651ce2a8",
  pageTypeSlug: "domain",
  slug: "persona-points",
  definition: "a measure of the attention Alan gave one part of his life",
  partSlugs: ["domain/persona-day-score"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Attention counts where it made that part of Alan's life better, whoever did the work.",
    },
    {
      invariantKind: "departure",
      statement: "The stoplight built from a persona's points is what prompts Alan.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change to a persona's green day points rescores her history as far as her stored days reach.",
    },
    {
      invariantKind: "departure",
      statement: "A persona's daily points and her running total read the same source.",
    },
    {
      invariantKind: "departure",
      statement: "For some sources a persona's running total is the sum of her days.",
    },
    {
      invariantKind: "departure",
      statement:
        "A persona's running total only ever rises, unless a rebuild rewrites it downward.",
    },
    {
      invariantKind: "departure",
      statement: "A day's color is computed rather than stored.",
    },
    {
      invariantKind: "gap",
      statement: "A stored day agrees with what its recipe computes, for every persona at once.",
    },
    {
      invariantKind: "gap",
      statement: "A persona's points compute the same wherever the command is run from.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing tells Alan a persona has no figure while something else shows him one.",
    },
    {
      invariantKind: "gap",
      statement: "No figure Alan reads is arrived at by counting files in a directory.",
    },
    {
      invariantKind: "gap",
      statement: "Every persona under a value can move that value's light.",
    },
  ],
} as const satisfies Domain
