import type { Module } from "@akasha/code-system/module"

export const pagesUnheld = {
  id: "01a0655d-daab-7e2d-87b3-2f04937720ed",
  pageTypeSlug: "module",
  slug: "pages-unheld",
  definition: "a page read and a page written where nothing is held between calls",
  code: "ts",
} as const satisfies Module
