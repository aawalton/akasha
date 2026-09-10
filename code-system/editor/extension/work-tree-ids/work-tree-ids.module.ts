import type { Module } from "../../../modules/module.page-type.types.ts"

export const workTreeIds = {
  id: "01a064c8-9a9c-7f08-a940-edc2c37c2024",
  pageTypeSlug: "module",
  type: "module",
  slug: "work-tree-ids",
  definition: "the strings the editor knows the work tree's view and its commands by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The names here are the names the extension manifest has.",
    },
    {
      invariantKind: "departure",
      statement: "Every command's name opens with the view's name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes the view or the commands these names reach.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a row of the work tree.",
    },
  ],
} as const satisfies Module
