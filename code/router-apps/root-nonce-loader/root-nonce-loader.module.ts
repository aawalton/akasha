import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const rootNonceLoader = {
  id: "01a0911f-df93-7daf-8b5c-e52e803f1f79",
  type: "module",
  slug: "root-nonce-loader",
  definition: "the nonce a root route answers to the document that route renders",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A root route names this loader rather than spelling a loader of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The nonce answered is the one the app's server put on the load context.",
    },
  ],
} as const satisfies Module
