import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const personaPoint = {
  id: "01a0675b-16f8-7862-b5f6-3061651ce2a8",
  type: "domain",
  slug: "persona-point",
  definition: "a measure of the attention Alan gave one part of his life",
  parts: ["module/persona-points-keeping"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Attention counts where that attention made that part of Alan's life better.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Attention counts the same from every worker.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stoplight built from a persona's points prompts Alan.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A change to a persona's green day points rescores her history as far as her stored days reach.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona's daily points and her running total read the same source.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "For some sources a persona's running total is the sum of her days.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona's running total only ever rises.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rebuild rewrites a persona's running total downward.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day's color is computed rather than stored.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A stored day agrees with the points its recipe computes.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A persona's points compute the same wherever the command is run from.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing tells Alan a persona has no figure while something else shows Alan one.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "No figure Alan reads is arrived at by counting files in a directory.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Every persona under a value can move that value's light.",
    },
  ],
} as const satisfies Domain
