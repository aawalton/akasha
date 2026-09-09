import type { Module } from "@akasha/code/module"

export const listenerSet = {
  id: "01a07cd7-ff21-7b3f-a03a-2ca0fd18a8b8",
  pageTypeSlug: "module",
  type: "module",
  slug: "listener-set",
  definition: "the callbacks a store tells when the value that store has changes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subscriber is handed back the call that drops that subscriber.",
    },
    {
      invariantKind: "departure",
      statement: "A store has the value and reaches here only for the callbacks.",
    },
  ],
} as const satisfies Module
