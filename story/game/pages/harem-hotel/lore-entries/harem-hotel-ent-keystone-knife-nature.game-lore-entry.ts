import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntKeystoneKnifeNature = {
  id: "01a0c94c-3fde-7795-a17e-dfeba0544988",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-keystone-knife-nature",
  title: "The Keystone Knife",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "the-keystone-knife",
  said: "The keystone knife is the slim, plain, cold blade — no longer than Alan's hand — that was seated in the Doorward's keystone core, 'as though the hall had set it there and grown the guard up around it,' and drawn by Alan at the floor-1 clear (t18). It is the weapon that stopped the construct: driven back home into the keystone fault, it cut the Doorward still. Alan 'knows what it is for as surely as [he has] known nothing else in this place.' It is now his standing weapon and his first in the Hotel — see ent-alan inventory (ent-alan-armed). (Its design name and combat properties are the loremaker's sheet-truth, not asserted here.)",
  turn: 18,
  quote:
    "you close your fingers on the haft and work it loose — a knife, slim and plain and cold, no longer than your hand",
  attribute: "nature",
} as const satisfies GameLoreEntry
