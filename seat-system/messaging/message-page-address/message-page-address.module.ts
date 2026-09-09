import type { Module } from "@akasha/code/module"

export const messagePageAddress = {
  id: "01a0686c-f06b-700c-8b8f-51f577e30eb1",
  pageTypeSlug: "module",
  type: "module",
  slug: "message-page-address",
  definition: "the address and the identity a message page's name carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name of three segments is a domain and a role and an identity.",
    },
    {
      invariantKind: "departure",
      statement: "A name of two segments is a seat name and an identity.",
    },
    {
      invariantKind: "departure",
      statement: "A two-segment name is read as an address only where a person is behind it.",
    },
    {
      invariantKind: "departure",
      statement: "A name of any other shape is no address rather than a refused address.",
    },
  ],
} as const satisfies Module
