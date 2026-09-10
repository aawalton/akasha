import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const registryCa = {
  id: "01a06813-7b0f-77e9-b7be-7c10f95506c1",
  pageTypeSlug: "module",
  type: "module",
  slug: "registry-ca",
  definition: "the registry CA certificate's path and the bytes at it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where the cluster's authority sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement: "That authority is reached by the id its page carries.",
    },
    {
      invariantKind: "departure",
      statement: "The certificate's file name is read from the property holding that certificate.",
    },
  ],
} as const satisfies Module
