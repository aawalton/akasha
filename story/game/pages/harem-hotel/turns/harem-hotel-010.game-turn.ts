import type { GameTurn } from "akasha/story/game/turn/game-turn.page-type.types.ts"

export const haremHotel010 = {
  id: "01a0c686-8de9-7b07-8007-019071c138a2",
  type: "page-type/game-turn",
  slug: "harem-hotel-010",
  game: "game/harem-hotel",
  number: 10,
  windows: [
    { kind: "quest-complete", name: "Closeness", note: "close the distance between you" },
    { kind: "quest-complete", name: "The Kiss", note: "kiss her" },
    { kind: "quest-offer", name: "The Night", note: "take her to bed" },
    { kind: "quest-complete", name: "The Night", note: "take her to bed" },
    { kind: "quest-complete", name: "Fully Hers", note: "give yourself to her fully" },
  ],
} as const satisfies GameTurn
