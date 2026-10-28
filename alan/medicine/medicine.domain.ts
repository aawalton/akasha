import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const medicine = {
  id: "01a0675b-16f0-7ba0-82ff-12a2a6ec360b",
  type: "page-type/domain",
  slug: "medicine",
  definition: "Alan's medical health",
  parts: ["domain/disability-adjusted-micromort"],
  createdAt: "2026-09-03T13:00:18.032Z",
  updatedAt: "2026-10-28T17:53:09.445Z",
} as const satisfies Domain
