import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntDoorwardCombatV4 = {
  id: "01a0c94c-3f68-7923-b781-4c4981d60602",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-doorward-combat-v4",
  title: "The Doorward",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "the-doorward",
  said: "The low chest seam is the Doorward's vulnerability — confirmed by action at t14, where a clawed strike to the seam opened it while the warded mass turns every other blow aside. It is slow off the wall but its arms swing fast and hard. The reachable way in is to bait its attention (Alan) and strike the exposed flank (Aria). BUT it guards its known wound: once the seam is opened, it keeps the cracked side turned to the wall and presents only warded shoulder, so a REPEAT of the exact same bait-and-strike is countered (claws skid off warded plaster, no purchase). Reaching the seam again takes a NEW opening or angle, not a repeat of the last. Its adaptation is narrow — it protects the wound; it does not otherwise get cleverer. AND it grapples: any fighter caught inside its reach is seized and pinned by its vast arms and crushed — the lethal line — so the close-in game is its own danger, not merely the path to the seam. This surfaced at t17 when Alan took it down body-to-body and its arms clamped him to the pale mass as they landed, pinning one arm and crushing the air out of him with no way back out.",
  turn: 17,
  quote:
    "they clamp you to the pale mass as you land, pinning one arm to your side, crushing the air out of you",
  attribute: "combat",
  supersedes: "game-lore-entry/harem-hotel-ent-doorward-combat-v3",
} as const satisfies GameLoreEntry
