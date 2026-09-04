import type { Module } from "@akasha/code-system/module"

export const pageValueKey = {
  id: "01a06879-ef4b-7000-a6f7-e981bd4744bc",
  pageTypeSlug: "module",
  slug: "page-value-key",
  definition: "the key names a page's values keep for its body and for what stands beside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's body stands in its values under one name, and that name is stated here.",
    },
    {
      invariantKind: "departure",
      statement: "An attachment stands in a page's values under one name, and it is stated here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
  ],
} as const satisfies Module
