import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const applyFilters = {
  id: "01a05b92-a9c7-7ca6-98f5-5897fafa3430",
  type: "page-type/module",
  slug: "apply-filters",
  definition: "whether a page row matches a view's filters",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A filter this module cannot read is refused rather than passed over.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Pages are left whole while the properties of their page type are unread.",
    },
  ],
  createdAt: "2026-09-01T06:05:33.511Z",
  updatedAt: "2026-09-28T19:44:45.000Z",
} as const satisfies Module
