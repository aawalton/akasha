import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const regretTaking = {
  id: "01a16fed-a2bb-7220-bd2a-f0ff91e78289",
  type: "page-type/module",
  slug: "regret-taking",
  definition: "how a supervisor takes a person's message back out of its seat's transcript",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The transcript is the one the seat's transcript path names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cut is found before the child is signalled, and made once the child is gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn the signal ended is no reason to keep the message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anything said after the message in the meantime keeps the transcript whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cut transcript is read again for the turn from its first byte.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message page still there is marked shown and then taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Replies are held from the signal until the cut, so no partial reply is pushed.",
    },
  ],
  createdAt: "2026-10-24T22:00:07.098Z",
  updatedAt: "2026-10-24T22:00:07.098Z",
} as const satisfies Module
