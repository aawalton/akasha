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
    "target-page-type-slug",
  ],
  design: [
    "A relation check walks `extendsSlug`.",
    "The type carries which page type a relation may name; whether that page exists is a different claim, answered here.",
  ],
} as const satisfies Module
