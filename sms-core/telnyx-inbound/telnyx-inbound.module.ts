import type { Module } from "../../code-system/modules/module.page-type.ts"

export const telnyxInbound = {
  id: "01a05b6f-999d-7889-a400-39692d7f8c8b",
  pageTypeSlug: "module",
  slug: "telnyx-inbound",
  definition: "the fields of a Telnyx sms webhook lifted out of its envelope",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field the shape does not name is carried through rather than stripped.",
    },
    {
      invariantKind: "departure",
      statement: "A missing text body reads as empty text.",
    },
    {
      invariantKind: "departure",
      statement: "A missing direction reads as unknown rather than as inbound.",
    },
    {
      invariantKind: "departure",
      statement: "A sender is required where every other field of the payload is optional.",
    },
  ],
} as const satisfies Module
