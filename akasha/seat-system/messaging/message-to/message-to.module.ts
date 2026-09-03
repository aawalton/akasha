import type { Module } from "@akasha/code-system/module"

export const messageTo = {
  id: "01a0686c-f06b-700b-b0ac-bf88b0cd5564",
  pageTypeSlug: "module",
  slug: "message-to",
  definition: "the seat a message addressed to a domain and a role is for",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An address is a domain and a role together.",
    },
    {
      invariantKind: "departure",
      statement: "A domain stated without a role is refused rather than read as half an address.",
    },
    {
      invariantKind: "departure",
      statement:
        "A role stated without a domain names no one seat, the same role being held across every domain.",
    },
    {
      invariantKind: "departure",
      statement: "Where several seats state one address, the most recently active is the one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A domain no document declares is said to be undeclared before any seat is sought.",
    },
  ],
} as const satisfies Module
