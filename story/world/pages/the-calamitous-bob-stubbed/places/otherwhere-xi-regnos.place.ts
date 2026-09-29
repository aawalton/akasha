import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiRegnos = {
  id: "01a0ea86-d672-70a4-9497-8b54988ce750",
  type: "page-type/place",
  slug: "otherwhere-xi-regnos",
  title: "Regnos",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-enoria",
  facts: [
    {
      fact: "Regnos is a valley in the center of Enoria around a lone volcano.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Regnos was called the Jewel of Enoria for its iron.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The first battle of Enoria's civil war was fought at Regnos.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Regnos is cursed by its battles and haunted by undead and aberrants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The pass into Regnos is fortified and closed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Enorian warpriests hunt the aberrant remnants in Regnos.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Burning aberrants were fought at Regnos in recent years.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "North of Regnos the land is arid, with golden-fruit orchards for sweet wine.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
