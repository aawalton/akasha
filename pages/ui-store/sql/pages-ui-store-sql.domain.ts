import type { Domain } from "akasha/domains/domain.page-type.ts"

export const pagesUiStoreSql = {
  id: "01a071cc-3e6b-7a23-8b07-f26b6635ed27",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "pages-ui-store-sql",
  definition: "the SQL a store hands the server",
  parts: ["module/options"],
} as const satisfies Domain
