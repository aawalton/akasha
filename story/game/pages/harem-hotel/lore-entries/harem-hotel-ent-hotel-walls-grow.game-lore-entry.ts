import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntHotelWallsGrow = {
  id: "01a0c94e-bf05-71e2-ac68-94446e555ef3",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-hotel-walls-grow",
  title: "Harem Hotel",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "harem-hotel",
  said: "The hotel's walls grow rooms and doorways on demand — a doorway (and the room behind it) can press itself out of flat plaster where none was.",
  turn: 1,
  quote:
    "a second doorway pressing itself out of flat plaster, molding and lintel and all, as if the corridor had recalled it wanted one more room here and simply put one in.",
  attribute: "architecture",
} as const satisfies GameLoreEntry
