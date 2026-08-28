import type { Module } from "../code-system/module/module.page-type.ts"

export const relationResolves = {
  id: "01a04a20-6e05-7eb7-8723-5be9377693a3",
  pageTypeSlug: "module",
  slug: "relation-resolves",
  definition: "the check refusing a relation that names no page",
  code: "ts",
  requiredReadingSlugs: [
    "akasha-check",
    "akasha-page-edge",
  ],
  design: [
    "A relation check that does not walk `extendsSlug` is worthless, because a domain is a page and almost every relation crosses that.",
    "The type carries which page type a relation may name; whether that page exists is a different claim, answered here.",
  ],
} as const satisfies Module
