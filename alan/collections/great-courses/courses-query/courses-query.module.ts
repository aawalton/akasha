import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const coursesQuery = {
  id: "01a06579-f3d9-7003-83c3-1c73c2fbe33b",
  type: "module",
  slug: "courses-query",
  definition: "the `great-course` pages the store holds, indexed by the catalogue id each has",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row holding no id or no slug is left out of the index.",
    },
  ],
} as const satisfies Module
