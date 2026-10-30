import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const telnyxSendReply = {
  id: "01a18d9c-ffe0-7edd-bfe3-707a35a829e3",
  type: "page-type/module",
  slug: "telnyx-send-reply",
  definition: "how code reads the reply Telnyx gives to a request to send a text message",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer the shape refuses is reported rather than thrown.",
    },
  ],
  createdAt: "2026-10-30T16:20:39.007Z",
  updatedAt: "2026-10-30T16:20:39.007Z",
} as const satisfies Module
