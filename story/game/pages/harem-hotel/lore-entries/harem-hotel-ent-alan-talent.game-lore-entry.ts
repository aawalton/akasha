import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAlanTalent = {
  id: "01a0c94e-c020-7a2c-8b92-6a8c64203a92",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-alan-talent",
  title: "Alan",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "alan",
  said: "unknown — at first measurement the System pane leaves Alan's Talent line blank (not zero, not hidden; simply empty).",
  turn: 1,
  quote: "Low on the pane, one line where a value should sit stays blank.",
  attribute: "talent",
} as const satisfies GameLoreEntry
