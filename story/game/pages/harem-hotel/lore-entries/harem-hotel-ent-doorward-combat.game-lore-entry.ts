import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntDoorwardCombat = {
  id: "01a0c94e-bb55-7d91-8aa0-aea04309492b",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-doorward-combat",
  title: "The Doorward",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "the-doorward",
  said: "Per Aria's read: the Doorward is slow off the wall but hits like the wall it came out of (heavy, hard-hitting). A low seam sits on its pale chest where the plaster closed over itself — 'might be soft,' but she can't be certain from range. Her tactics: stay off its inside, keep it between the two of them, and wear it down. This is a fight to be won by positioning and attrition, not a puzzle to be solved.",
  turn: 13,
  quote: "Stay off its inside, keep it between us, and we wear it down.",
  attribute: "combat",
} as const satisfies GameLoreEntry
