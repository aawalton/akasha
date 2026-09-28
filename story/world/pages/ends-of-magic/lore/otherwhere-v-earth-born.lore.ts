import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVEarthBorn = {
  id: "01a0e9f6-d213-7854-95cf-fd845269d68c",
  type: "page-type/lore",
  slug: "otherwhere-v-earth-born",
  title: "Earth-Born",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-earth-born",
  facts: [
    {
      fact: "Earth-born people are not of Davrar but come from a world in the universe beyond it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Earth-born people are human in body.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Earth has no smart systems, no digitized minds and no folded space.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Davrar adapts an Earth-born arrival to the local biosystem and judges their abilities.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Davrar counts the Earth-born at a Disadvantage and speeds their growth until it passes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Earth-born speak no tongue of Davrar; mental magic can implant a language painfully.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the eyes of Questors, the Earth-born are mortals like Davrar's natives.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
