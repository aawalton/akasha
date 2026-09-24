import type { GameLoreEntry } from "akasha/story/game/game-lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntSystemIndividuatedPanes = {
  id: "01a0c94e-c15a-7784-a7b9-873cd7319e0b",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-system-individuated-panes",
  title: "The System",
  game: "story-game/harem-hotel",
  kind: "entity",
  subject: "the-system",
  said: "Each person's System pane is private to them — Aria's letters hang where only she can read them and Alan cannot, and his where only he can and she cannot.",
  turn: 11,
  quote: "Hers hang where she can see them and you cannot; yours where you can and she cannot.",
  attribute: "panes",
} as const satisfies GameLoreEntry
