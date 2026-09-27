import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theDatingGameByuStreamTrail = {
  id: "01a0e3c3-475d-7f42-8928-89107fe5ae0c",
  type: "page-type/place",
  slug: "the-dating-game-byu-stream-trail",
  title: "The Stream Trail",
  world: "world/personas",
  facts: [
    {
      fact: "A quiet trail runs beside a stream that circles BYU campus, halfway down the hill.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Willows and maples shade the stream trail, the maples just starting to turn.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "On a Saturday afternoon the stream trail is nearly empty.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
  ],
} as const satisfies Place
