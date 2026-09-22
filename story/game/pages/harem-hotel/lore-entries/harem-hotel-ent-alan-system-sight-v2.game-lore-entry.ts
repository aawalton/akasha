import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAlanSystemSightV2 = {
  id: "01a0c94c-4058-7109-83b2-251678ac5fc2",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-alan-system-sight-v2",
  title: "Alan",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "alan",
  said: "The System's pane spoke and showed only to Alan through the first night; at THE LINK's first activation it addresses Aria as well — by her account the first time it has ever spoken to her.",
  turn: 10,
  quote: "It never spoke to me before. Not once, in all my years.",
  attribute: "systemSight",
  supersedes: "game-lore-entry/harem-hotel-ent-alan-system-sight",
} as const satisfies GameLoreEntry
