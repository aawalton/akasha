import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const kofi = {
  id: "01a0b789-a595-7afe-8aee-1d895f33815c",
  type: "page-type/domain",
  slug: "kofi",
  definition:
    "the account Alan's products call for backing on, and what Ko-fi does with that backing",
  parts: ["domain/contribution-point", "domain/feature-request", "page-type/contributor"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A coffee on Ko-fi costs five dollars.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Ko-fi reports no cancellation, refund or chargeback of a payment Ko-fi reported.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Ko-fi has no read API, and its only reconciliation is a CSV a person downloads.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Ko-fi's webhook is authenticated by a static token in the request body.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A Stripe membership keeps for life the platform fee that membership started under.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A membership is bound to the payment account it started under and cannot be moved.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Ko-fi is not the merchant of record, so tax, refunds and disputes are Alan's.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Ko-fi has no creator search or directory, so Ko-fi sends Alan no traffic.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A Ko-fi membership is monthly, with no annual term, free tier, trial or pause.",
    },
  ],
} as const satisfies Domain
