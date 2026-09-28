import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVGoldenRespite = {
  id: "01a0e9fa-9136-7f41-ba22-d98e50825401",
  type: "page-type/place",
  slug: "otherwhere-v-golden-respite",
  title: "The Golden Respite",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-dawns-concord",
  facts: [
    {
      fact: "The Golden Respite is a palatial four-story inn near the Arena, run by Jenice's family.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It combines a hotel lobby, a fine restaurant, and a fashion, armor and weapon boutique.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its ceiling is painted as a rosy sky with a sun.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Room of Golden Waves has a balcony.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The inn serves food on unique artistic plates and has a breakfast nook with living trees.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
