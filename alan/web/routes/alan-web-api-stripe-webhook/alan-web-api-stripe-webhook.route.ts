import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiStripeWebhook = {
  id: "01a0ba9c-04fb-7a10-9331-ba1d5382ec7a",
  type: "page-type/route",
  slug: "alan-web-api-stripe-webhook",
  definition: "the payment Stripe hands this app",
  code: "ts",
  urlPath: "api/stripe/webhook",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The signed text is read off the request before anything parses that request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body whose Stripe signature does not verify is answered 403 and acted on by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An event moving no points is answered 200 with the reason it moved none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor is found by the hash of the address the charge names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One question answers whether a contributor is there and what that contributor holds.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A transaction is a row beside the page rather than a file, so no file call reads one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address nobody has paid under before opens a contributor holding no points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A charge already carried by a transaction is answered 200 and moves nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A balance is written again as the sum of the transactions the write lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A write the pages service refused is answered 503 so Stripe sends the event again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The address a charge names is written nowhere.",
    },
  ],
} as const satisfies Route
