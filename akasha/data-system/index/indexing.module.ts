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
    "A page's body can be loaded after the file it came from is gone.",
    "An index file is replaced whole, never appended to.",
    "Identity is settled for every page in a write before any relation is.",
    "A property's target is read from the index rather than from the corpus.",
    "A value that narrows to more than one page is refused, never resolved to one of them.",
    "A value the index cannot resolve is reported, never thrown.",
    "A rebuild reads the index only to find what no page carries.",
    "A body that will not load is reported only for a page.",
    "The repository root is given to the index rather than derived from where the index sits.",
  ],
} as const satisfies Module
