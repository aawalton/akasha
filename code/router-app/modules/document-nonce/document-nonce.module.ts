import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const documentNonce = {
  id: "01a0d44a-7109-778a-9d43-4a730ae6ab03",
  type: "page-type/module",
  slug: "document-nonce",
  definition: "the nonce a server render hands every tag the document writes",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page an app renders carries the nonce, an error page among them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The nonce reaches a layout from the server entry rather than from loader data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A render in the browser reads no nonce.",
    },
  ],
} as const satisfies Module
