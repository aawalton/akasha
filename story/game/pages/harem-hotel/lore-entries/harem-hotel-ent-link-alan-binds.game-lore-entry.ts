import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntLinkAlanBinds = {
  id: "01a0c94c-3edc-79f8-82b2-8db1af233ec0",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-link-alan-binds",
  title: "The Link",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "the-link",
  said: "Alan's LINK binding takes Aria's plain, unarguable force — the way the whole night bends itself around her without her seeming to ask it to.",
  turn: 12,
  quote:
    "It is the plain force of her: the fact of the whole strange night bending itself around her without her seeming to ask it to. That. You reach for it, and you tell the pane so.",
  attribute: "alanBound",
} as const satisfies GameLoreEntry
