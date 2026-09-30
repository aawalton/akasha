import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereINala2 = {
  id: "01a0f3a6-fe8c-714b-800f-818d7d51ced8",
  type: "page-type/lore",
  slug: "overwhere-i-nala-2",
  title: "Nala, continued",
  world: "world/hell-hound-evolution-litrpg",
  about: "character-player/overwhere-i-nala",
  facts: [
    {
      fact: "Nala's earth-and-water sensing ripple reaches about fifty yards; past that it blurs.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-i-nala"],
    },
    {
      fact: "Killing the Level 12 reedlurker at 11:09 on day 2 raised Nala to Level 5.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-i-nala"],
    },
  ],
} as const satisfies Lore
