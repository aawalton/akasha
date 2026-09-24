import type { GameLoreEntry } from "akasha/story/game/game-lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntDoorwardCombatV2 = {
  id: "01a0c94e-bc4c-716b-8deb-029e82acdf4b",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-doorward-combat-v2",
  title: "The Doorward",
  game: "story-game/harem-hotel",
  kind: "entity",
  subject: "the-doorward",
  said: "The low chest seam IS the Doorward's vulnerability — confirmed by action, not oracle: Aria's t13 hedge ('might be soft') was borne out when her claws found it and it GAVE, a long crack splitting up the construct where the warded mass otherwise turns every blow aside. It is slow off the wall but its arms swing fast and hit hard; the way to reach the seam is to bait its attention (Alan) and strike the exposed flank (Aria), keeping it between them. It is big: one crack will not fell it — it must be worn down by repeated seam-hits.",
  turn: 14,
  quote:
    "the seam opens under her hand, and a long crack runs up from it with a sound like a flagstone splitting.",
  attribute: "combat",
  supersedes: "game-lore-entry/harem-hotel-ent-doorward-combat",
} as const satisfies GameLoreEntry
