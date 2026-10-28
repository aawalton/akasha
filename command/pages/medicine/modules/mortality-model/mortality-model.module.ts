import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mortalityModel = {
  id: "01a183df-77ea-7474-9382-2e812de5772e",
  type: "page-type/module",
  slug: "mortality-model",
  definition:
    "the chances of each way Alan could die, drawn from his causes of death and his factors",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A relative risk is drawn from the lognormal its low and high bound at 95%.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two pages citing one estimate for one factor share that estimate's draw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A dose-response risk is raised to the power of Alan's dose against the baseline's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every risk factor a page states is read by one entry of the readings table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A risk factor no entry reads is refused rather than guessed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The run goes a year at a time from Alan's age to 100, with every cause competing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An age no band of a cause holds has none of that cause's deaths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every action reruns the same draws, so the difference is the action's alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No life past 100 is counted.",
    },
  ],
  createdAt: "2026-10-28T18:57:02.952Z",
  updatedAt: "2026-10-28T18:57:02.952Z",
} as const satisfies Module
