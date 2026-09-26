import type { ReadoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.types.ts"

export const inboxCount = {
  id: "01a0dde9-20ff-760b-b50c-4dba4001bf6f",
  type: "page-type/readout-scale",
  slug: "inbox-count",
  definition: "how much is waiting in an inbox",
  blackAt: 10000,
  redAt: 1000,
  orangeAt: 100,
  yellowAt: 10,
  greenAt: 1,
  blueAt: 0,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every inbox takes this one scale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each rung above green is ten times the one below it.",
    },
  ],
} as const satisfies ReadoutScale
