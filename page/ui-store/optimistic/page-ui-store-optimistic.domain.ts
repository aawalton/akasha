import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiStoreOptimistic = {
  id: "01a071cb-e8e9-764a-a670-4e9f2cc593fa",
  type: "page-type/domain",
  slug: "page-ui-store-optimistic",
  definition: "a change shown in a browser before the change is kept",
  parts: ["module/convergence", "module/optimistic-mutation", "module/plan"],
  createdAt: "2026-09-05T13:39:43.977Z",
  updatedAt: "2026-10-19T17:48:05.541Z",
} as const satisfies Domain
