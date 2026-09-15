import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiStoreSql = {
  id: "01a071cc-3e6b-7a23-8b07-f26b6635ed27",
  type: "page-type/domain",
  slug: "page-ui-store-sql",
  definition: "the SQL a store hands the server",
  parts: ["module/options"],
} as const satisfies Domain
