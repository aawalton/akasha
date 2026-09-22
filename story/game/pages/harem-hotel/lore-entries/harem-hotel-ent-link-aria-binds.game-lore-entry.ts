import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntLinkAriaBinds = {
  id: "01a0c94e-bc0d-7268-a99e-aa8682a7c10c",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-link-aria-binds",
  title: "The Link",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "the-link",
  said: "Aria's LINK binding takes Alan's truth-keeping — the part of him that holds its ground and keeps a thing true when it would be easier not to (explicitly not his cleverness, which she declined).",
  turn: 12,
  quote: "The part that keeps a thing true when it would be easier not to.",
  attribute: "ariaBound",
} as const satisfies GameLoreEntry
