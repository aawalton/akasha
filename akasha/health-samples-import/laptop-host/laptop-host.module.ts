import type { Module } from "../../code-system/modules/module.page-type.ts"

export const laptopHost = {
  id: "01a05c14-b119-7003-ac6e-29f5219a020b",
  pageTypeSlug: "module",
  slug: "laptop-host",
  definition: "the laptop health readings are taken from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The laptop is reached at its tailnet address rather than by name.",
    },
  ],
} as const satisfies Module
