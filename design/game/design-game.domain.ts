import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const designGame = {
  id: "01a08d92-71d5-7756-9ed3-92f9ffa0ddea",
  type: "page-type/domain",
  slug: "design-game",
  definition: "how a game is made well",
  parts: ["domain/mechanic", "page-type/achievement", "page-type/drive"],
  createdAt: "2026-09-10T23:06:19.989Z",
  updatedAt: "2026-09-25T14:29:14.000Z",
} as const satisfies Domain
