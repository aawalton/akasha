import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAlanAttire = {
  id: "01a0c94c-4388-7d59-b68a-5e2c6c67a4a5",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-alan-attire",
  title: "Alan",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "alan",
  said: "The only garment ever named on Alan is a shirt — Aria opened its front and drew it off him during the night (turn-10), dropping it on the floor of his suite. No lower-body clothing, footwear, or other garment has been described, and turn-1 does not detail what he woke in. His skin bears no markings, unlike Aria's silver tracery.",
  turn: 10,
  quote: "She gets the shirt down your arms and off, and drops it without looking where it falls.",
  attribute: "attire",
} as const satisfies GameLoreEntry
