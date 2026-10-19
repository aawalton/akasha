import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const toolAccess = {
  id: "01a06964-d998-7eb2-b409-f7b943e17909",
  type: "page-type/module",
  slug: "tool-access",
  definition: "how code reads the agent tools an agent can use",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the settings page sits is asked of the index rather than spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The settings body is the file beside that page rather than a second path.",
    },
  ],
  createdAt: "2026-09-03T22:30:12.120Z",
  updatedAt: "2026-10-19T19:37:25.692Z",
} as const satisfies Module
