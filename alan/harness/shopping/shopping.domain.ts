import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const shopping = {
  id: "01a15446-0f0c-72f2-9958-acb35307d5e8",
  type: "page-type/domain",
  slug: "shopping",
  definition: "the things Alan means to buy",
  parts: ["page-type/store", "page-type/shopping-item"],
  createdAt: "2026-10-19T13:07:19.947Z",
  updatedAt: "2026-10-19T13:08:29.054Z",
} as const satisfies Domain
