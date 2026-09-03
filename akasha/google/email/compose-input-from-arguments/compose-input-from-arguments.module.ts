import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const composeInputFromArguments = {
  id: "01a0658e-2bf5-7000-bebe-fd0c97b225b3",
  pageTypeSlug: "module",
  slug: "compose-input-from-arguments",
  definition: "a composition built from the arguments an email command was called with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An address list is split on commas as well as on repeated flags.",
    },
    {
      invariantKind: "departure",
      statement: "An empty address list is left out rather than carried as an empty list.",
    },
    {
      invariantKind: "departure",
      statement: "A sender given in angle brackets carries the name before the brackets.",
    },
    {
      invariantKind: "departure",
      statement: "Quotation marks around a sender name are dropped.",
    },
    {
      invariantKind: "departure",
      statement: "An attachment is read off the disk before the composition is answered.",
    },
  ],
} as const satisfies Module
