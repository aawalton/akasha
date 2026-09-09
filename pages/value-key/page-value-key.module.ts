import type { Module } from "@akasha/code/module"

export const pageValueKey = {
  id: "01a06879-ef4b-7000-a6f7-e981bd4744bc",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-value-key",
  definition: "the key names a page's values keep for its body and for what sits beside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's body is in its values under one name.",
    },
    {
      invariantKind: "departure",
      statement: "The name a body sits under is stated here.",
    },
    {
      invariantKind: "departure",
      statement: "An attachment is in a page's values under one name.",
    },
    {
      invariantKind: "departure",
      statement: "The name an attachment sits under is stated here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
  ],
} as const satisfies Module
