import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageCoreFilter = {
  id: "01a071c6-08d9-7da0-83a9-8cc992a2b7ea",
  type: "page-type/domain",
  slug: "page-core-filter",
  definition: "how code chooses the pages a view shows",
  parts: ["module/filter-to-condition", "module/property-path"],
  createdAt: "2026-09-05T13:33:18.937Z",
  updatedAt: "2026-09-25T17:19:03.000Z",
} as const satisfies Domain
