import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiStoreOptimistic = {
  id: "01a071cb-e8e9-764a-a670-4e9f2cc593fa",
  type: "page-type/domain",
  slug: "page-ui-store-optimistic",
  definition: "a change a browser shows before the change is kept",
  parts: ["module/convergence", "module/optimistic-mutation", "module/plan"],
} as const satisfies Domain
