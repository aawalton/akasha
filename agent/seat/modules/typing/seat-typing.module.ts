import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatTyping = {
  id: "01a1700a-736c-70a3-b031-f1a92c3c1ad8",
  type: "page-type/module",
  slug: "seat-typing",
  definition: "how a seat's page shows the people that write a message to the seat",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A person writing a message tells the seat's page at once, then at most every thirty seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person stops being shown typing on sending or emptying the box.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person leaving the box, the page or the app is still shown typing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person who stops telling is shown typing for five minutes more at most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line names the other persons typing and never the person reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "While the seat works, the line names its persona as replying.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A browser signed in only to look tells nobody it is typing.",
    },
  ],
  createdAt: "2026-10-24T22:31:35.532Z",
  updatedAt: "2026-10-30T14:52:37.444Z",
} as const satisfies Module
