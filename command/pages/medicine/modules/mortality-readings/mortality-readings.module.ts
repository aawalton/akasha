import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mortalityReadings = {
  id: "01a183df-77ea-7e32-8970-64a259cec552",
  type: "page-type/module",
  slug: "mortality-readings",
  definition: "how each risk factor a cause of death states is read against Alan",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each entry names the factor it reads, and a page's factor must match it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each entry says what it assumed in words of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A self-diagnosed condition ranges from no added risk to the source's central value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action is a change to what is read of Alan, and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action no factor on a page moves is said to be unmodelled.",
    },
  ],
  createdAt: "2026-10-28T18:57:02.952Z",
  updatedAt: "2026-10-28T18:57:02.952Z",
} as const satisfies Module
