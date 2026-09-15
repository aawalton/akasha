import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const composeInputFromArguments = {
  id: "01a0658e-2bf5-7000-bebe-fd0c97b225b3",
  type: "module",
  slug: "compose-input-from-arguments",
  definition: "a composition built from the arguments an email command was called with",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address list is split on commas as well as on repeated flags.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty address list is left out rather than carried as an empty list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sender given in angle brackets has the name before the brackets.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Quotation marks around a sender name are dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attachment is read off the disk before the composition is answered.",
    },
  ],
} as const satisfies Module
