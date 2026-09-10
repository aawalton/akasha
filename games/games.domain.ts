import type { Domain } from "../domains/domain.page-type.types.ts"

export const games = {
  id: "01a06579-e4f7-73d7-82b9-ba43cabd8707",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "games",
  definition: "the games and what each game is made of",
  parts: [
    "domain/clear-the-world",
    "domain/game-design",
    "page-type/idle-game",
    "page-type/game-achievement",
  ],
} as const satisfies Domain
