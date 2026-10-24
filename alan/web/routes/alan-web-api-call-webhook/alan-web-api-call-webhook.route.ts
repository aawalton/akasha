import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiCallWebhook = {
  id: "01a16fae-6059-7a8e-b03e-04f55e075112",
  type: "page-type/route",
  slug: "alan-web-api-call-webhook",
  definition: "the call events Telnyx hands this app",
  code: "ts",
  urlPath: "api/call/webhook",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body whose Telnyx signature does not verify is answered 403 and acted on by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An incoming call is the only event acted on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call from Alan's or Jenny's phone is answered with its sound streamed to the call room.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call from any other number is rejected.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sound is streamed both ways as 8 kHz mu-law.",
    },
  ],
  createdAt: "2026-10-24T20:51:01.335Z",
  updatedAt: "2026-10-24T20:51:01.335Z",
} as const satisfies Route
