import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const verifyStripeSignature = {
  id: "01a0ba94-259d-76eb-abb6-1b5550909276",
  type: "page-type/module",
  slug: "verify-stripe-signature",
  definition: "whether an inbound webhook truly came from Stripe",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The signed text is the timestamp and the raw body joined by a dot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The signature is an HMAC over that text under the shared secret, as lower hex.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The header carries the timestamp and every signature as comma-parted pairs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A header carrying more than one signature verifies where any one of them does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A signature older than the tolerance is refused however well it verifies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tolerance is five minutes where no tolerance is given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two signatures are compared in time that does not depend on where they differ.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here throws.",
    },
  ],
} as const satisfies Module
