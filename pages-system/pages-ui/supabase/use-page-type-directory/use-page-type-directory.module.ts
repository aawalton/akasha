import type { Module } from "@akasha/code-system/module"

export const usePageTypeDirectory = {
  id: "01a06164-b506-7001-b35d-312b7a7d55ae",
  pageTypeSlug: "module",
  slug: "use-page-type-directory",
  definition:
    "React hook taking a page type slug to its id through a directory the server answers.",
  code: "ts",
} as const satisfies Module
