import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const productGame = {
  id: "01a06579-e4f7-73d7-82b9-ba43cabd8707",
  type: "page-type/domain",
  slug: "product-game",
  definition: "the games and the parts of each game",
  parts: ["domain/clear-the-world"],
  createdAt: "2026-09-03T04:14:42.423Z",
  updatedAt: "2026-09-22T14:05:26.000Z",
} as const satisfies Domain
