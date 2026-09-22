import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAlanTalent = {
  id: "01a0c94c-4231-7b20-84aa-03ff341ca09e",
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
