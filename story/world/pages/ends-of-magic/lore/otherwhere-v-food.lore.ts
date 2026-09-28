import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVFood = {
  id: "01a0ea04-c280-77e7-a591-5f04c3a68a8e",
  type: "page-type/lore",
  slug: "otherwhere-v-food",
  title: "Food",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-food",
  facts: [
    {
      fact: "Kafkan is a drink taken to stay awake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Slickfish are shellfish fried in oil until they pop and turn bright yellow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Slickfish must be eaten quickly, before they melt away.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A spice smelling strongly of licorice can mask one's scent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Travelers eat preserved rations and hunt to stretch them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Roadside taverns in Ostren serve iced desserts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Breakfast in Dawn's Concord is a sweetened coffee-like drink with pastries.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Questor restaurants serve crawler tail, a burger-like dish, and toxic dishes that need tolerance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Those restaurants sell antidotes and healing with their toxic dishes, at extra cost.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
