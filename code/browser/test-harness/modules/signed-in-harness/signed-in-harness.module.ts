import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const signedInHarness = {
  id: "01a0c4c2-6b4e-70bb-908c-84ca9470f2e6",
  type: "page-type/module",
  slug: "signed-in-harness",
  definition: "a browser session opened as the contributor a handover code names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The session is a handover code traded at the site for the cookie that site sets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code is bound to a verifier this session makes and hands over once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The contributor signed in as is the one Alan's person page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The signing key is read from its secret page rather than from the environment.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "The signing key is never written, logged, carried into a refusal, or handed to the browser.",
    },
  ],
} as const satisfies Module
