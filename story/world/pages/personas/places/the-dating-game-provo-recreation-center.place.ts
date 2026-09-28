import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theDatingGameProvoRecreationCenter = {
  id: "01a0e7ba-7628-7a2a-a9ca-8898aa758842",
  type: "page-type/place",
  slug: "the-dating-game-provo-recreation-center",
  title: "Provo Recreation Center",
  world: "world/personas",
  facts: [
    {
      fact: "The Provo Recreation Center is at 320 West 500 North, west of downtown Provo.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "The Provo Recreation Center opens Monday to Saturday, 5 AM to 10 PM.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "The Provo Recreation Center is closed on Sundays, its doors locked and its lot empty.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
  ],
} as const satisfies Place
