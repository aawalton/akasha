import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const designGame = {
  id: "01a08d92-71d5-7756-9ed3-92f9ffa0ddea",
  type: "page-type/domain",
  slug: "design-game",
  definition: "how progression in games and in gamified life is built",
  parts: ["domain/mechanic", "page-type/achievement", "page-type/drive"],
} as const satisfies Domain
