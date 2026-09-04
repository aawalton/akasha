import type { Module } from "@akasha/code-system/module"

export const markdownPageSeq = {
  id: "01a068bf-a99d-7002-87a7-ff50339dafa3",
  pageTypeSlug: "module",
  slug: "markdown-page-seq",
  definition: "the next sequence number a page type hands out, taken under a lock",
  code: "ts",
} as const satisfies Module
