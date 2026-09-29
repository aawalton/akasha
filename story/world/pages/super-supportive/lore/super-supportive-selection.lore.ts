import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveSelection = {
  id: "01a0e9fa-71c2-7fda-819c-4461f394df62",
  type: "page-type/lore",
  slug: "super-supportive-selection",
  title: "Selection by the System",
  world: "world/super-supportive",
  about: "world-mechanic/super-supportive-selection",
  facts: [
    {
      fact: "The System offers access to about 0.07% of people; they are called or chosen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most are chosen between the ages of 15 and 17.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-iii-nala",
        "character-other/super-supportive-gorgon",
      ],
    },
    {
      fact: "Everyone knows the selection speech by heart; it cites the 1963 agreement with the Artonans.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Children of two non-Avowed are rarely selected; every globie is a statistical miracle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No one past seventeen has ever been chosen; the System closes to an adult for good.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-iii-nala",
        "character-other/super-supportive-gorgon",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
