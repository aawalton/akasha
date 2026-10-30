import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageListingLoader = {
  id: "01a08e24-787c-78b5-a972-ca859eaa4fd8",
  type: "page-type/module",
  slug: "page-listing-loader",
  definition: "how a website finds the page type at a path",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug reaching no page type is answered 404.",
    },
  ],
  createdAt: "2026-09-11T01:45:49.948Z",
  updatedAt: "2026-10-30T16:16:37.247Z",
} as const satisfies Module
