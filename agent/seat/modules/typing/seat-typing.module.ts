import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatTyping = {
  id: "01a1700a-736c-70a3-b031-f1a92c3c1ad8",
  type: "page-type/module",
  slug: "seat-typing",
  definition: "the line under a seat's conversation naming who else is typing to the seat",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A person writing a message tells the seat's page at most every three seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person stops being shown typing on sending, emptying the box, or leaving it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person who stops telling is shown typing for eight seconds more at most.",
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
  updatedAt: "2026-10-24T22:31:35.532Z",
} as const satisfies Module
