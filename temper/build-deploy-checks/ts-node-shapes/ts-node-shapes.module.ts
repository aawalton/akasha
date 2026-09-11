import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const tsNodeShapes = {
  id: "01a06287-7841-7895-be68-97c06e83843f",
  pageTypeSlug: "module",
  slug: "ts-node-shapes",
  definition: "the key a member access names",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A field named with a dot and a field named with a string read alike.",
    },
  ],
} as const satisfies Module
