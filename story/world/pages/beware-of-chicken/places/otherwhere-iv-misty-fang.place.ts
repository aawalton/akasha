import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvMistyFang = {
  id: "01a0ea10-f36a-74c6-9d9d-f654083ffe67",
  type: "page-type/place",
  slug: "otherwhere-iv-misty-fang",
  title: "Misty Fang",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-howling-fang-mountains",
  facts: [
    {
      fact: "The Misty Fang was the foxes' ancestral mountain home, now the Shrouded Mountain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Su Nezuha once ruled the Misty Fang, warding out demons with her blood, Qi and tribute.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Lightning Brigade massacred the Misty Fang foxes and took their mountain for its sect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Su Nezan is the last trueborn of the Misty Fang.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
