import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageCoreViewState = {
  id: "01a071cb-7212-7f03-b59e-099c65e92766",
  type: "page-type/domain",
  slug: "page-core-view-state",
  definition: "how code changes a view",
  parts: ["module/reducers", "module/view-state-change"],
} as const satisfies Domain
