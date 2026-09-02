import type { Module } from "../../code-system/modules/module.page-type.ts"

export const stringAt = {
  id: "01a05cc9-029c-7f57-8f4e-de247a60828d",
  pageTypeSlug: "module",
  slug: "string-at",
  definition: "the string a record holds under a key, or nothing",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An empty string is answered rather than read as nothing.",
    },
  ],
} as const satisfies Module
