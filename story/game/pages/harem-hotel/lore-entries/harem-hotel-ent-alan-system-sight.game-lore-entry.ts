import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAlanSystemSight = {
  id: "01a0c94c-41de-7fce-ae0e-9139eee7dc14",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-alan-system-sight",
  title: "Alan",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "alan",
  said: "Only Alan can see the System pane; his companion cannot — it speaks to him and not to her.",
  turn: 6,
  quote: '"So it talks to you, and not to me," she says, quiet, working it as she goes.',
  attribute: "systemSight",
} as const satisfies GameLoreEntry
