import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVElkCentaur = {
  id: "01a0e9f4-0046-79c1-900f-9444ea5f32d6",
  type: "page-type/lore",
  slug: "otherwhere-v-elk-centaur",
  title: "Elk-Centaur",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-elk-centaur",
  facts: [
    {
      fact: "An elk-centaur has the four-legged body of an elk below and a man's torso above.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elk-centaurs have gray skin like maple bark and grow antlers from their heads.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some elk-centaurs have silver hair and deep, smooth voices.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elk-centaurs serve as scouts in Gemore's scouting teams, ranging the pine forests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An elk-centaur moves quickly through the forest and can carry a rider on his back.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
