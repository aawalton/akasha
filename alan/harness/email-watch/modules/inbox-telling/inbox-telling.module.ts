import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inboxTelling = {
  id: "01a18d8a-eff8-7dc5-8ee7-20b7c8bf34e3",
  type: "page-type/module",
  slug: "inbox-telling",
  definition: "how code sends a message to an agent about the email that waits on the agent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only claims nobody has been told about yet are announced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim is marked told only once the telling has landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A claim is told to the persona whose channel it names rather than to the handler.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim carrying no handle is told to the handler.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A telling that fails leaves only that handle's claims untold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim an agent rule took is put to the handler as the handler's to judge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim a rule asked the handler be told of is put to the handler as news.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mail announced is still in the inbox.",
    },
  ],
  createdAt: "2026-10-30T16:00:55.262Z",
  updatedAt: "2026-10-30T16:00:55.262Z",
} as const satisfies Module
