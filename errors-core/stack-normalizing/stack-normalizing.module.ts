import type { Module } from "../../code-system/modules/module.page-type.ts"

export const stackNormalizing = {
  id: "01a05c48-deeb-7017-b565-3730f8ab193a",
  pageTypeSlug: "module",
  slug: "stack-normalizing",
  definition: "a stack trace with line numbers, directories and build hashes taken out",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A frame repeated directly after itself is dropped.",
    },
  ],
} as const satisfies Module
