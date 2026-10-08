import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theDatingGameAppleAvenue = {
  id: "01a0e842-4961-7e74-97d0-ad3fffc2455e",
  type: "page-type/place",
  slug: "the-dating-game-apple-avenue",
  title: "Apple Avenue",
  world: "world/personas",
  facts: [
    {
      fact: "Alan's neighborhood is quiet streets of brick houses, lawns and big old trees.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "From Apple Avenue the mountains rise close to the east, with Y Mountain to the southeast.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "On Sunday afternoons families in church clothes walk home along the streets near Apple.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Where the streets near Apple crest, the whole valley opens below, Utah Lake at its far edge.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
  ],
  createdAt: "2026-09-28T13:44:13.409Z",
  updatedAt: "2026-09-28T13:48:56.000Z",
} as const satisfies Place
