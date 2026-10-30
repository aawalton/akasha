import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const telnyxSend = {
  id: "01a05b6f-999d-731e-a182-ed95ac7ecc35",
  type: "page-type/module",
  slug: "telnyx-send",
  definition: "the request that asks Telnyx to send a text message",
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
      statement: "A caller may point the request at somewhere other than Telnyx.",
    },
  ],
  createdAt: "2026-09-01T05:27:15.613Z",
  updatedAt: "2026-10-30T16:20:39.007Z",
} as const satisfies Module
