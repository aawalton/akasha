import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorMessage = {
  id: "01a06287-7841-76ad-85d5-861974947268",
  type: "page-type/module",
  slug: "error-message",
  definition: "the message read off a thrown value of any shape",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A thrown value that renders to nothing still answers with a message.",
    },
  ],
  createdAt: "2026-09-02T14:30:40.449Z",
  updatedAt: "2026-09-21T22:03:34.000Z",
} as const satisfies Module
