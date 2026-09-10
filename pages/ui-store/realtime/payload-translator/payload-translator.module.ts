import type { Module } from "@akasha/code/module"

export const payloadTranslator = {
  id: "01a05b69-4556-79e3-bbe6-95c694d630da",
  pageTypeSlug: "module",
  type: "module",
  slug: "payload-translator",
  definition: "the shape a page row arrives in over the wire",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page kept as a file carries a sequence number only where its page type numbers its pages.",
    },
    {
      invariantKind: "departure",
      statement: "A row stating no sequence number is read rather than throwing its batch away.",
    },
  ],
} as const satisfies Module
