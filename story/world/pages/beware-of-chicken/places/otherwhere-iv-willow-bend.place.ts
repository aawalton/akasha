import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvWillowBend = {
  id: "01a0e9e0-d26b-7db4-a19c-73c3deeec373",
  type: "page-type/place",
  slug: "otherwhere-iv-willow-bend",
  title: "Willow Bend",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "Willow Bend is a slow loop of a clear river in the rolling green of the Azure Hills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An old willow leans over a grassy bank at the bend, its roots in the water.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iv-nala"],
    },
    {
      fact: "Downstream the hillsides step down in flooded rice terraces toward a village.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iv-nala"],
    },
    {
      fact: "The village below is Three Stones, a mortal farming village of some forty households.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A cart track runs past the bend, with a carved stone marker where it meets the river.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iv-nala"],
    },
    {
      fact: "The marker reads: Three Stones Village, five li downstream.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iv-nala"],
    },
    {
      fact: "Upstream the hills rise wilder, forested in pine and bamboo, where beasts are seen.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
