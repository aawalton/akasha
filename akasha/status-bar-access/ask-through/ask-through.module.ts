import type { Module } from "../../code-system/module/module.page-type.ts"

export const askThrough = {
  id: "01a05c9d-4096-7100-bdfa-0be0514d547c",
  pageTypeSlug: "module",
  slug: "ask-through",
  definition: "the page store bound to the port the readout engine asks through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query the store refuses throws rather than answering nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A binding is made for each call rather than held between them.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a query or a readout.",
    },
  ],
} as const satisfies Module
