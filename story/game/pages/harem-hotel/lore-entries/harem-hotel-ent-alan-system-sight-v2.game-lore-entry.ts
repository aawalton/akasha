import type { GameLoreEntry } from "akasha/story/game/game-lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAlanSystemSightV2 = {
  id: "01a0c94e-be3a-73b8-b323-1ff7938b45d5",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-alan-system-sight-v2",
  title: "Alan",
  game: "story-game/harem-hotel",
  kind: "entity",
  subject: "alan",
  said: "The System's pane spoke and showed only to Alan through the first night; at THE LINK's first activation it addresses Aria as well — by her account the first time it has ever spoken to her.",
  turn: 10,
  quote: "It never spoke to me before. Not once, in all my years.",
  attribute: "systemSight",
  supersedes: "game-lore-entry/harem-hotel-ent-alan-system-sight",
} as const satisfies GameLoreEntry
