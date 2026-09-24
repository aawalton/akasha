import type { GameLoreEntry } from "akasha/story/game/game-lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntDoorwardCombatV3 = {
  id: "01a0c94e-bc8c-721a-a712-0d9605c3bc49",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-doorward-combat-v3",
  title: "The Doorward",
  game: "story-game/harem-hotel",
  kind: "entity",
  subject: "the-doorward",
  said: "The low chest seam is the Doorward's vulnerability — confirmed by action at t14, where a clawed strike to the seam opened it while the warded mass turns every other blow aside. It is slow off the wall but its arms swing fast and hard. The reachable way in is to bait its attention (Alan) and strike the exposed flank (Aria). BUT it guards its known wound: once the seam is opened, it keeps the cracked side turned to the wall and presents only warded shoulder, so a REPEAT of the exact same bait-and-strike is countered (claws skid off warded plaster, no purchase). Reaching the seam again takes a NEW opening or angle, not a repeat of the last. Its adaptation is narrow — it protects the wound; it does not otherwise get cleverer.",
  turn: 15,
  quote:
    "The thing has kept the one lesson the last pass taught it — it holds the cracked side turned inward, hunched toward the wall, and gives Aria the flat of its warded shoulder instead",
  attribute: "combat",
  supersedes: "game-lore-entry/harem-hotel-ent-doorward-combat-v2",
} as const satisfies GameLoreEntry
