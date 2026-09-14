import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const pageValueKey = {
  id: "01a06879-ef4b-7000-a6f7-e981bd4744bc",
  type: "module",
  slug: "page-value-key",
  definition: "the key name a page's values keep its body under",
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
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
  ],
} as const satisfies Module
