import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const game = {
  id: "01a0c600-67f1-7ff1-8827-5238889f44c3",
  type: "page-type/namespace",
  slug: "game",
  definition: "the games being played, and the numbers their turns settle",
  parts: ["command/game-settle"],
  name: "game",
} as const satisfies Namespace
