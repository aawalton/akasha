import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatMessageAsking = {
  id: "01a16ff5-a19c-7277-93d9-bd9ed96ff636",
  type: "page-type/module",
  slug: "seat-message-asking",
  definition: "how a route finds the person signed in and the seat that person names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The person is the one whose page names the signed-in contributor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is found by its id among the seats that person may read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that person may not read is answered as no seat of that id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is answered as JSON naming the error, under the status handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's page is found by its name, for a route keeping values beside it.",
    },
  ],
  createdAt: "2026-10-24T22:08:51.099Z",
  updatedAt: "2026-10-24T22:37:13.218Z",
} as const satisfies Module
