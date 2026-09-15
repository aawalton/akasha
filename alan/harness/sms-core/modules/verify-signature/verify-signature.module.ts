import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const verifySignature = {
  id: "01a05b6f-999d-7522-a55b-564a85f90c43",
  type: "page-type/module",
  slug: "verify-signature",
  definition: "whether an inbound webhook truly came from Telnyx",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The signed text is the timestamp and the raw body joined by a bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A signature older than the tolerance is refused however well that signature verifies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tolerance is five minutes where no tolerance is given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clock ahead of the signer is tolerated as far as a clock behind the signer.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here throws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The base64 spelling of bytes is here for any caller that needs that spelling.",
    },
  ],
} as const satisfies Module
