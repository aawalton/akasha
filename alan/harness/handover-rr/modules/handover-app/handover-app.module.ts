import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const handoverApp = {
  id: "01a0bc7a-bbc5-7600-bf03-dcb69fe7f4e6",
  type: "page-type/module",
  slug: "handover-app",
  definition:
    "what the iOS app is called, where a code reaches it, and the shape a challenge takes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The app is named by its bundle id, and a code for the app names that id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code reaches the app over a url scheme rather than over an origin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A challenge is forty-three base64url characters, and anything else is no challenge.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No verifier is named here, and this side sees only the hash of one.",
    },
  ],
} as const satisfies Module
