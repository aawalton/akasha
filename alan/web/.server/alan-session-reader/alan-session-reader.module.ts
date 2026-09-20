import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alanSessionReader = {
  id: "01a0c119-72b0-74f5-b872-e3b9944a812a",
  type: "page-type/module",
  slug: "alan-session-reader",
  definition: "who a request is from, read off a Google session or off supabase",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Google session names the reader, and supabase names one where that session does not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bearer token is read by supabase alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A reader off a Google session carries a contributor and no account id.",
    },
  ],
} as const satisfies Module
