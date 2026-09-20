import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const googleAuthServer = {
  id: "01a0bb11-44b4-71af-a75d-f347bd292d0a",
  type: "page-type/module",
  slug: "google-auth-server",
  definition: "the Better Auth instance alanwalton.com signs a person in with, and its handler",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No database is stated, so the session is held in the cookie and nowhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Google is the one provider, and no password signs anybody in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Who Google says a person is replaces what the provider would have worked out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That call is made on every callback, so a returning person is read the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The id token is decoded and its signature is checked by nothing.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The token came from Google over TLS, so nothing here fetches a key to check it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every refusal answers with nothing rather than throwing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Answering with nothing sends the person back with the reason in the address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address Google has not marked verified answers with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The address Google answers with is read as the sign-in is worked out and written nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The contributor a sign-in reaches is carried on the session as a field of its own.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A field a provider fills is one a caller could fill over the wire as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The route that edits a person is turned off, so no caller names its own contributor.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lets a person change what is written about them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The instance is made once and held for the life of the process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The one plugin here trades a code from the app for a session of this site's own.",
    },
  ],
} as const satisfies Module
