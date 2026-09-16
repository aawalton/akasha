import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const productGame = {
  id: "01a06579-e4f7-73d7-82b9-ba43cabd8707",
  type: "page-type/domain",
  slug: "product-game",
  definition: "the games and what each game is made of",
  parts: ["domain/clear-the-world"],
} as const satisfies Domain
