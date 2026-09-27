import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedLayout = {
  id: "01a0e53c-775d-7506-ae05-7a7bfffc74b5",
  type: "page-type/module",
  slug: "played-layout",
  definition: "the arrangement of a story played's run, action bar and panels on a screen",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page is laid wide only while a panel beside the run draws something.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel beside the run that draws nothing leaves the page narrow, with no room held for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel above the run or in it never lays the page wide.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The panels sit beside the run on a wide screen and take the place of its text on a narrow one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "On a narrow screen a button in the sticky header turns between the text and the panels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The action bar stays under the panels while they take the text's place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panels taking the text's place lie on the page's own surface.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Turning back to the text returns to where the reader was in it.",
    },
  ],
} as const satisfies Module
