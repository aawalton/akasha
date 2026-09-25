import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const personaPoint = {
  id: "01a0675b-16f8-7862-b5f6-3061651ce2a8",
  type: "page-type/domain",
  slug: "persona-point",
  definition: "a measure of the attention Alan gave a part of his life",
  parts: ["module/persona-points-keeping"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Attention counts where that attention made that part of Alan's life better.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Attention counts the same from every worker.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stoplight built from a persona's points prompts Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona's daily points and her running total read the same source.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "For some sources a persona's running total is the sum of her days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona's running total only ever rises.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rebuild rewrites a persona's running total downward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's color is computed rather than stored.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona's points compute the same wherever the command is run from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing tells Alan a persona has no figure while something else shows Alan one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No figure Alan reads is arrived at by counting files in a directory.",
    },
  ],
} as const satisfies Domain
