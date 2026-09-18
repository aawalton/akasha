import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyBudget = {
  id: "01a0b6e3-22de-7cc3-9e86-b827104ed1b3",
  type: "page-type/module",
  slug: "spotify-budget",
  definition: "the calls one window holds, counted against the account every process shares",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The count sits beside the account's page, so every process counts against one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot is taken before a call is made rather than after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot taken is spent whether the call answered or threw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call made once the window is older than its length opens a new window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A taker beyond what the window holds is told how long that window has left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A taker held off by a ban is told the ban rather than the window.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No call is made while the lock over the count is held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The account a call is counted against is asked of the index rather than spelled.",
    },
  ],
} as const satisfies Module
