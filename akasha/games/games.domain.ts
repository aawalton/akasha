import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const games = {
  id: "01a06579-e4f7-73d7-82b9-ba43cabd8707",
  pageTypeSlug: "domain",
  slug: "games",
  definition: "the games and what each game is made of",
  partSlugs: ["domain/clear-the-world", "page-type/idle-game"],
} as const satisfies Domain
