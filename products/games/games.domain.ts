import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const games = {
  id: "01a06579-e4f7-73d7-82b9-ba43cabd8707",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "games",
  definition: "the games and what each game is made of",
  parts: ["domain/clear-the-world", "page-type/idle-game"],
} as const satisfies Domain
