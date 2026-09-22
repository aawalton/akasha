import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const telnyxSend = {
  id: "01a05b6f-999d-731e-a182-ed95ac7ecc35",
  type: "page-type/module",
  slug: "telnyx-send",
  definition: "an outgoing message put into the request Telnyx wants and the answer read back",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here sends the request this module builds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The api key rides in the authorization header.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer the shape refuses is reported rather than thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may point the request at somewhere other than Telnyx.",
    },
  ],
} as const satisfies Module
