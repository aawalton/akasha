import type { Domain } from "../../domains/domain.page-type.ts"

export const personaPoints = {
  id: "01a0675b-16f8-7862-b5f6-3061651ce2a8",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "persona-points",
  definition: "a measure of the attention Alan gave one part of his life",
  parts: ["module/persona-points-keeping"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Attention counts where that attention made that part of Alan's life better.",
    },
    {
      invariantKind: "departure",
      statement: "Attention counts the same from every worker.",
    },
    {
      invariantKind: "departure",
      statement: "The stoplight built from a persona's points prompts Alan.",
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
      statement: "A persona's running total only ever rises.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuild rewrites a persona's running total downward.",
    },
    {
      invariantKind: "departure",
      statement: "A day's color is computed rather than stored.",
    },
    {
      invariantKind: "gap",
      statement: "A stored day agrees with the points its recipe computes.",
    },
    {
      invariantKind: "gap",
      statement: "A persona's points compute the same wherever the command is run from.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing tells Alan a persona has no figure while something else shows Alan one.",
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
