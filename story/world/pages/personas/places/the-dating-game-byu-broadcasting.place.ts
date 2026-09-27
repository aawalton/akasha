import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theDatingGameByuBroadcasting = {
  id: "01a0e37d-b040-778c-b7a8-0b5e0d2be2d8",
  type: "page-type/place",
  slug: "the-dating-game-byu-broadcasting",
  title: "BYU Broadcasting Building",
  world: "world/personas",
  facts: [
    {
      fact: "BYUradio broadcasts from the BYU Broadcasting Building on the east side of campus.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/the-dating-game-alan",
        "character-other/the-dating-game-echo",
      ],
    },
    {
      fact: "The building's audio booths are small, padded rooms with a window onto a control desk.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/the-dating-game-alan",
        "character-other/the-dating-game-echo",
      ],
    },
    {
      fact: "On a Saturday the building is nearly empty, and Echo has a badge that opens it.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/the-dating-game-alan",
        "character-other/the-dating-game-echo",
      ],
    },
  ],
} as const satisfies Place
