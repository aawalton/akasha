import type { Route } from "akasha/code/routes/route.page-type.types.ts"

export const alanWebApiSmsWebhook = {
  id: "01a08830-10e1-711f-916e-888aba8c6066",
  type: "route",
  slug: "alan-web-api-sms-webhook",
  definition: "the inbound text Telnyx hands this app",
  code: "ts",
  urlPath: "api/sms/webhook",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The signed text is read off the request before anything parses that request.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body whose Telnyx signature does not verify is answered 403 and acted on by nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A keyword the carrier answers for itself is recognised here and answered by nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "An inbound text becomes a message to the handler seat the sender's relationship names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A sender nobody enrolled is written to the alan seat rather than let go in silence.",
    },
    {
      invariantKind: "departure",
      statement: "A handler target no seat holds becomes a refusal notice to the alan seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "A write the pages service refused is answered 503 rather than as a delivered receipt.",
    },
    {
      invariantKind: "departure",
      statement:
        "The enrolled senders are read before the machinery runs, and a list unread answers 503.",
    },
    {
      invariantKind: "departure",
      statement: "Every effect the inbound machinery needs is handed in by this route.",
    },
  ],
} as const satisfies Route
