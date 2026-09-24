import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requestsAuthProvider = {
  id: "01a0c537-bbe7-7ea3-aabc-220dc3ae73ca",
  type: "page-type/module",
  slug: "requests-auth-provider",
  definition: "what tells the Requests site's page store who is reading, signed in or not",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page store comes up for a reader who is not signed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What an unsigned reader is served is settled by the gate the server holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The store is asked for the page types alone before anything is rendered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The store follows each page it holds, signed in or not.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A slug naming no page type never comes ready, and every read waits behind it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The store reads nothing for a reader it holds no name for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader who has not signed in is named to the store as `anonymous`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That name is who the accesses are held by, so the gate answers the same reader.",
    },
  ],
} as const satisfies Module
