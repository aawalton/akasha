import type { Module } from "@akasha/code-system/module"

export const pageResolverProvider = {
  id: "01a061df-fe7f-7000-87cf-99df32ea8ebf",
  pageTypeSlug: "module",
  slug: "page-resolver-provider",
  definition:
    "Supplies the page resolver its children read, filled from the pages the store holds.",
  code: "tsx",
} as const satisfies Module
