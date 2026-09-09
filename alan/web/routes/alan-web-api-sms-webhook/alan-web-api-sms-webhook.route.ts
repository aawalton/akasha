import type { Route } from "@akasha/code/route"

export const alanWebApiSmsWebhook = {
  id: "01a08830-10e1-711f-916e-888aba8c6066",
  pageTypeSlug: "route",
  slug: "alan-web-api-sms-webhook",
  definition: "the inbound text Telnyx hands this app",
  code: "ts",
  urlPath: "api/sms/webhook",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The message page an inbound text becomes is no page type the pages service has.",
    },
    {
      invariantKind: "absence",
      statement: "No inbound text reaches a seat.",
    },
    {
      invariantKind: "departure",
      statement: "Telnyx is answered 503 rather than a delivered receipt.",
    },
    {
      invariantKind: "departure",
      statement: "A sender is told the text was not delivered rather than told the text arrived.",
    },
  ],
} as const satisfies Route
