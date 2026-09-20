import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const appHandoverSession = {
  id: "01a0bc7d-2f57-79b3-8aa0-f4bb7ff7c9d3",
  type: "page-type/module",
  slug: "app-handover-session",
  definition: "the site's own Better Auth session a code from the app is traded for",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A session is made by Better Auth's own endpoint rather than by a cookie written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That endpoint sits at no url and is reached by this server's own code alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That endpoint reads the code itself and takes no contributor on trust.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code naming a contributor no user answers to signs nobody in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused trade is a contributor of nobody rather than a thrown error.",
    },
  ],
} as const satisfies Module
