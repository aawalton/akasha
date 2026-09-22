import type { GameTurn } from "akasha/story/game/turn/game-turn.page-type.types.ts"

export const haremHotel012 = {
  id: "01a0c686-8e18-7dec-b856-9916dfc2898a",
  type: "page-type/game-turn",
  slug: "harem-hotel-012",
  game: "game/harem-hotel",
  number: 12,
  windows: [
    {
      kind: "talent-activation",
      name: "THE LINK",
      note: "bound — Presence (hers) bound to you. Will (yours) bound to her. A bound trait rises as its source rises.",
    },
    {
      kind: "quest-offer",
      name: "The Shut Door",
      note: "open the door at the dark end of the hall",
    },
  ],
} as const satisfies GameTurn
