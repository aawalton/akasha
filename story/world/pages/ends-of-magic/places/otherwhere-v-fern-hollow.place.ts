import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVFernHollow = {
  id: "01a0e9e4-706a-77ea-88bf-f538189767cf",
  type: "page-type/place",
  slug: "otherwhere-v-fern-hollow",
  title: "Fern Hollow",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "Fern Hollow is a bowl-shaped clearing in an old forest, floored with moss and ferns.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
    {
      fact: "The hollow's trees are huge and straight, with bark like grey scales and bluish leaves.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
    {
      fact: "A spring rises in the hollow's low side and runs off as a clear, cold brook.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Faint green lights drift under the canopy at dusk, and the ferns glow where they touch.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The brook runs down toward a woodcutters' track and, beyond it, a river valley.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A spring wells up between two roots on the hollow's low side and runs downhill as a clear brook.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
    {
      fact: "Faint green lights drift under the canopy over the hollow as the light goes golden toward dusk.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
    {
      fact: "Something unseen in the hollow's ferns ticks and clicks like a clock with too many hands.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
  ],
} as const satisfies Place
