import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const twoDTen = {
  id: "01a0c481-9962-7004-948f-8969cae64eaf",
  type: "page-type/game-mechanic",
  slug: "two-d-ten",
  definition: "two dice of ten sides, the handful the tower reaches for first",
  code: "ts",
} as const satisfies GameMechanic
