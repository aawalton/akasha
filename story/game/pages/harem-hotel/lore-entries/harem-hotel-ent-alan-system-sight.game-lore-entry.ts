import type { GameLoreEntry } from "akasha/story/game/game-lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAlanSystemSight = {
  id: "01a0c94e-bfc3-7086-a521-9865a8d5be95",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-alan-system-sight",
  title: "Alan",
  game: "story-game/harem-hotel",
  kind: "entity",
  subject: "alan",
  said: "Only Alan can see the System pane; his companion cannot — it speaks to him and not to her.",
  turn: 6,
  quote: '"So it talks to you, and not to me," she says, quiet, working it as she goes.',
  attribute: "systemSight",
} as const satisfies GameLoreEntry
