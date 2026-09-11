import type { Route } from "akasha/code/routes/route.page-type.types.ts"

export const alanWebApiSmsVerificationStatus = {
  id: "01a090d4-4959-7068-b799-d973b6d7993e",
  type: "route",
  slug: "alan-web-api-sms-verification-status",
  definition: "the toll-free verification status Telnyx hands this app",
  code: "ts",
  urlPath: "api/sms/verification-status",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body whose Telnyx signature does not verify is answered 403 and acted on by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The signed text is read off the request before anything parses that request.",
    },
    {
      invariantKind: "departure",
      statement:
        "A verified status reaches the handler seat as a message rather than landing quietly.",
    },
    {
      invariantKind: "departure",
      statement:
        "The body is carried over whole rather than read for fields nothing here has seen.",
    },
    {
      invariantKind: "departure",
      statement: "The message is written through the pages service, the road a pod's write keeps.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here answers Telnyx with a message.",
    },
    {
      invariantKind: "departure",
      statement: "The message states its own id.",
    },
  ],
} as const satisfies Route
