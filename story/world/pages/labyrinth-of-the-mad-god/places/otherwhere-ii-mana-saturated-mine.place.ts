import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiManaSaturatedMine = {
  id: "01a0e9be-00c7-7491-a36c-b8e79bfad83d",
  type: "page-type/place",
  slug: "otherwhere-ii-mana-saturated-mine",
  title: "The Mana-Saturated Mine",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-bladewind-badlands",
  facts: [
    {
      fact: "The mana-saturated mine is a shaft over a thousand feet deep in the eastern highlands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At the bottom a silvery vein in white stone follows a minor leyline of pure mana.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
