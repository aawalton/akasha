import type { Module } from "@akasha/code-system/module"

export const messagePageAddress = {
  id: "01a0686c-f06b-700c-8b8f-51f577e30eb1",
  pageTypeSlug: "module",
  slug: "message-page-address",
  definition: "the address and the identity a message page's name carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name of three segments is a domain, a role and an identity.",
    },
    {
      invariantKind: "departure",
      statement: "A name of two segments is a seat name and an identity.",
    },
    {
      invariantKind: "departure",
      statement: "A two-segment name is read as an address only where a person stands behind it.",
    },
    {
      invariantKind: "departure",
      statement: "A name of any other shape is no address rather than a refused one.",
    },
  ],
} as const satisfies Module
