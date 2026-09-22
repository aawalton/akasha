import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntDoorwardNature = {
  id: "01a0c94c-3df2-78ac-8044-f234614e28af",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-doorward-nature",
  title: "The Doorward",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "the-doorward",
  said: "The Doorward is the floor-1 challenge: a construct that stands up out of the far chamber's wall — the same dead-white plaster the whole Hotel is grown from — a heavy blank body a head taller than Alan and built wide. Unlike a passive lock, it aggresses: it does not wait to be looked at but turns on Alan and Aria 'with the slow certainty of a thing with one job and the mass to do it.'",
  turn: 13,
  quote:
    "The Doorward stands up out of the far wall as you cross the sill — the same dead-white plaster the whole place is grown from, pulling itself whole and upright, a heavy blank body a head taller than you and built wide",
  attribute: "nature",
} as const satisfies GameLoreEntry
