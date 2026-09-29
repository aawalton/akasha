import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvSimonsCrypt = {
  id: "01a0ed38-b909-7c24-91b3-13312ce79b13",
  type: "page-type/place",
  slug: "overwhere-iv-simons-crypt",
  title: "Simon's Crypt",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Simon's Crypt is the crypt dungeon near Southbrook, held by the Dreadlich Simon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is the region's beginners' dungeon, and skeletons fill its first floor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its dungeon brick halves the reach of rifts and other dimension skills cast inside.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Simon's bone laboratory lies deep within the crypt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pink slime, which harms the undead, is a peril to the crypt's master.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
