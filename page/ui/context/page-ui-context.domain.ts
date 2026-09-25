import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiContext = {
  id: "01a071cf-5cb5-7515-985b-9a9999073b99",
  type: "page-type/domain",
  slug: "page-ui-context",
  definition: "the values each component under a page can read",
  parts: ["module/page-resolver-context", "module/relation-picker-context"],
} as const satisfies Domain
