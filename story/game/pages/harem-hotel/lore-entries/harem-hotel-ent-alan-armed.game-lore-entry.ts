import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAlanArmed = {
  id: "01a0c94c-3f7a-7e18-990b-0b6c38244315",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-alan-armed",
  title: "Alan",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "alan",
  said: "Alan entered the Doorward fight empty-handed, but at the clear he drew a weapon from its bared keystone core: a knife, slim and plain and cold, no longer than his hand. He knows what it is for 'as surely as [he has] known nothing else in this place,' and it was the blade that stopped the construct. It is his first weapon in the Hotel — the one edged thing the wall was hiding — and he keeps it after the fight (the floor rises leaving 'nothing on the floor but you and the knife and Aria').",
  turn: 18,
  quote:
    "you close your fingers on the haft and work it loose — a knife, slim and plain and cold, no longer than your hand",
  attribute: "inventory",
  supersedes: "game-lore-entry/harem-hotel-ent-alan-empty-handed",
} as const satisfies GameLoreEntry
