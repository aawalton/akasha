import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvTheTangle22 = {
  id: "01a10181-07a7-7895-9922-43996f006fc2",
  type: "page-type/lore",
  slug: "overwhere-iv-the-tangle-2-2",
  title: "The Tangle, continued, continued",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  about: "place/overwhere-iv-the-tangle",
  facts: [
    {
      fact: "A fox at the cleft's dead bolts from anyone coming; nothing else living is near by day.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "On a breeze down the cleft comes faint woodsmoke from Grakk's camp fires, two and a half miles on.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A breeze down the cleft by day carries a faint smell of woodsmoke from far up the trail.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
  ],
} as const satisfies Lore
