import type { Module } from "../../code-system/module/module.page-type.ts"

export const indexing = {
  id: "01a04a62-b0ad-71cf-ae80-7af5dfb84ffd",
  pageTypeSlug: "module",
  slug: "indexing",
  definition: "the index entries the pages imply",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [
    "domain/akasha-page-edge",
    "module/corpus",
    "domain/index-identity",
    "domain/index-relation",
  ],
  design: [
    "An index file is replaced whole, never appended to.",
    "Identity is settled for every page in a write before any relation is.",
    "A rebuild reads the index only to find what no page carries.",
    "A body that will not load is reported only for a page.",
    "The repository root is given to the index rather than derived from where the index sits.",
  ],
  intent: [
    "A page the index cannot read is reported, never answered as empty.",
  ],
} as const satisfies Module
