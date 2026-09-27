import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theDatingGameProvoCityCemetery = {
  id: "01a0e54b-07f1-701b-b935-c260a0f372ab",
  type: "page-type/place",
  slug: "the-dating-game-provo-city-cemetery",
  title: "Provo City Cemetery",
  world: "world/personas",
  facts: [
    {
      fact: "Provo City Cemetery lies a short walk downhill from Apple Avenue, on the east bench.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Old headstones sit in rows under tall pines and spreading shade trees.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "At dusk the cemetery is empty, and its paths are unlit.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
