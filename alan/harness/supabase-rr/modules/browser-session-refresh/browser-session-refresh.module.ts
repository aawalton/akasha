import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const browserSessionRefresh = {
  id: "01a09099-ea3c-7d5e-a085-0b0c4402eeea",
  type: "page-type/module",
  slug: "browser-session-refresh",
  definition: "the Supabase session a browser holds, refreshed in place",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A refresh that fails is written to the warning console rather than thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line written carries the message the refresh failed with.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A caller hands in the client whose session is refreshed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the session a refresh answers with.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides when a session is refreshed.",
    },
  ],
} as const satisfies Module
