import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const telnyxInbound = {
  id: "01a05b6f-999d-7889-a400-39692d7f8c8b",
  type: "page-type/module",
  slug: "telnyx-inbound",
  definition: "the fields of a Telnyx sms webhook lifted out of its envelope",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the shape does not name is carried through rather than stripped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing text body reads as empty text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every picture a message carries is lifted out with the type the carrier names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing direction reads as unknown rather than as inbound.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sender is required where every other field of the payload is optional.",
    },
  ],
} as const satisfies Module
