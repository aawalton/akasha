import type { GameTurn } from "akasha/story/game/turn/game-turn.page-type.types.ts"

export const haremHotel018 = {
  id: "01a0c686-8e2b-7b5b-9e99-0e1497de567e",
  type: "page-type/game-turn",
  slug: "harem-hotel-018",
  game: "game/harem-hotel",
  number: 18,
  windows: [
    {
      kind: "quest-complete",
      name: "The Shut Door",
      note: "open the door at the dark end of the hall",
    },
  ],
} as const satisfies GameTurn
