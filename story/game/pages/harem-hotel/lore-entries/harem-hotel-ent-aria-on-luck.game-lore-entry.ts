import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAriaOnLuck = {
  id: "01a0c94e-be29-774c-b08f-a85a691af749",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-aria-on-luck",
  title: "Aria",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "aria",
  said: "Aria will not claim she can confer luck. When Alan asks to 'fuck for luck' before the next door, she honestly refuses the charm: she has no luck to give, it is not a thing she deals in, and 'the dice fall where they fall' — she would be lying to say her hands could tip them. She takes the intimacy gladly and for its own sake, explicitly 'not because it buys you anything at that door,' and afterward tells him he is 'no luckier than you were, but better company for the walk.' Consistent with the truth-keeping trait she bound off Alan: she does not sell comfort she cannot make true. (Narrative stance disclosed in prose; any luck/outcome mechanics are the loremaker's sheet-truth.)",
  turn: 20,
  quote:
    "I have no luck to give you, you know. It is not a thing I deal in — no one does; the dice fall where they fall, and I would be lying if I told you my hands could tip them.",
  attribute: "onLuck",
} as const satisfies GameLoreEntry
