import type { LoreDisclosure } from "akasha/story/lore-disclosure/lore-disclosure.page-type.types.ts"

export const gameMaster = {
  id: "01a0d419-95e0-7a75-85fc-2ee936bedadf",
  type: "page-type/lore-disclosure",
  slug: "game-master",
  title: "Game Master",
  definition: "known to the one running the game",
} as const satisfies LoreDisclosure
