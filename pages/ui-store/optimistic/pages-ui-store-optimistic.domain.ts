import type { Domain } from "akasha/domains/domain.page-type.ts"

export const pagesUiStoreOptimistic = {
  id: "01a071cb-e8e9-764a-a670-4e9f2cc593fa",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "pages-ui-store-optimistic",
  definition: "a change shown before the server has answered",
  parts: ["module/convergence", "module/optimistic-mutation", "module/plan"],
} as const satisfies Domain
