import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageListingLoader = {
  id: "01a08e24-787c-78b5-a972-ca859eaa4fd8",
  type: "page-type/module",
  slug: "page-listing-loader",
  definition: "the page type a slug in a url names, with the query beside it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug reaching no page type is answered 404.",
    },
  ],
  createdAt: "2026-09-11T01:45:49.948Z",
  updatedAt: "2026-09-20T23:54:07.000Z",
} as const satisfies Module
