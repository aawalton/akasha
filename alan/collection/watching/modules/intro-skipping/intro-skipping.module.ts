import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const introSkipping = {
  id: "01a1891d-850f-73d3-98bd-0781d7d5b89a",
  type: "page-type/module",
  slug: "intro-skipping",
  definition: "the skip button a streaming page shows, pressed as it appears",
  code: "ts",
  test: "ts",
  runsInABrowser: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A button whose words say skip and what it skips is pressed as it appears.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button is pressed once, however often the page draws it again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A button is a button saying skip and what it skips, whatever else it says beside that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wording long enough to be no button's own is read as no skip button.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page says for a moment that the skip buttons are watched for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page showing no such button is left exactly as it is.",
    },
  ],
  createdAt: "2026-10-29T19:22:55.630Z",
  updatedAt: "2026-10-29T19:43:08.608Z",
} as const satisfies Module
