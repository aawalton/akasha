import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inferenceSchema = {
  id: "01a0685d-4b35-7000-a89c-fa9904f3e21d",
  type: "module",
  slug: "inference-schema",
  definition: "what a declared inference host holds, and what a host says it is holding",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here shapes a service, which a page type shapes instead.",
    },
  ],
} as const satisfies Module
