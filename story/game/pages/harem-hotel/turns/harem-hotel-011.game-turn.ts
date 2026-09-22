import type { GameTurn } from "akasha/story/game/turn/game-turn.page-type.types.ts"

export const haremHotel011 = {
  id: "01a0c686-8e02-7b0d-8cdb-6ad445db8556",
  type: "page-type/game-turn",
  slug: "harem-hotel-011",
  game: "game/harem-hotel",
  number: 11,
  windows: [
    {
      kind: "system-choice",
      name: "THE LINK",
      note: "Bind one of Aria's skills or attributes to yourself. The bound trait rises as its source rises.",
    },
  ],
} as const satisfies GameTurn
