import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pageListingLoader = {
  id: "01a08e24-787c-78b5-a972-ca859eaa4fd8",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-listing-loader",
  definition: "the page type a plural slug in a url names, with the query beside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A plural slug reaching no page type is answered 404.",
    },
  ],
} as const satisfies Module
