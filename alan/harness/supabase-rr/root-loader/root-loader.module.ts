import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const rootLoader = {
  id: "01a08e19-0b33-7af0-8d2b-7653014c38dc",
  type: "module",
  slug: "root-loader",
  definition: "what a root route answers once its request is guarded",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The nonce goes back with the headers the guard worked out.",
    },
  ],
} as const satisfies Module
