import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const buildDirectory = {
  id: "01a08db3-6723-70df-8ccd-9abb25c56c16",
  pageTypeSlug: "module",
  type: "module",
  slug: "build-directory",
  definition: "the folder a web tree's build is written into",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build told no folder writes into the folder the pod serves.",
    },
    {
      invariantKind: "departure",
      statement: "A build told a folder writes into that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named as nothing but blanks is no folder.",
    },
  ],
} as const satisfies Module
