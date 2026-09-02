import type { Module } from "../../code-system/modules/module.page-type.ts"

export const inferEndpoint = {
  id: "01a05b55-e06e-7111-b593-e60ae5994db1",
  pageTypeSlug: "module",
  slug: "infer-endpoint",
  definition: "where the voice model answers when nothing else names it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The address is the one the cluster gives the service inside itself.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming its own address uses that address instead.",
    },
  ],
} as const satisfies Module
