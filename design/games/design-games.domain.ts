import type { Domain } from "../../domains/domain.page-type.types.ts"

export const designGames = {
  id: "01a08d92-71d5-7756-9ed3-92f9ffa0ddea",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "design-games",
  definition: "how progression in games and in gamified life is built",
  parts: ["page-type/drive"],
} as const satisfies Domain
