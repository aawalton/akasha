import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const useViewPages = {
  id: "01a06164-b506-7003-b710-49c187c71b5f",
  pageTypeSlug: "module",
  type: "module",
  slug: "use-view-pages",
  definition: "React hook giving back the pages one view holds.",
  code: "tsx",
} as const satisfies Module
