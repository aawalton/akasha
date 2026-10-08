import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const personHandlers = {
  id: "01a0691b-4f64-73b2-8015-87e24cab720b",
  type: "page-type/module",
  slug: "person-handlers",
  definition: "every person with the persona that handles the person's messages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A person nobody answers is warned about and left out rather than refusing the list.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here resolves a recipient.",
    },
  ],
  createdAt: "2026-09-03T21:09:52.612Z",
  updatedAt: "2026-09-25T18:01:16.000Z",
} as const satisfies Module
