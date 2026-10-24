import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alanSessionReader = {
  id: "01a0c119-72b0-74f5-b872-e3b9944a812a",
  type: "page-type/module",
  slug: "alan-session-reader",
  definition: "who a request is from, read off a Google session",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Google session names the reader, and nothing else names one.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No bearer token and no supabase cookie names a reader here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader carries a contributor, and the person page carries their account id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The person page carries the scheme a reader reads in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The person page carries the name a reader is shown under.",
    },
  ],
  createdAt: "2026-09-20T23:14:25.584Z",
  updatedAt: "2026-10-24T23:08:38.639Z",
} as const satisfies Module
