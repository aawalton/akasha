import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVAscendantAcademy = {
  id: "01a0e9f3-448a-73d9-9b80-820afab7510a",
  type: "page-type/place",
  slug: "otherwhere-v-ascendant-academy",
  title: "The Ascendant Academy",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-giantsrest",
  facts: [
    {
      fact: "The Ascendant Academy is Giantsrest's mage academy, at the hub of the city's roads.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Academy is nearly the size of a mountain and is called the Grave of All Giants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Academy is a Grand Dungeon, tamed and built over.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A glowing haze lights the Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Applicants pass an entrance hall, an interview booth and a magical testing area.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Academy has a grand audience hall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An enchanted painting in the Academy shows Ostren burning at night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Academy's walls are of conjured stone, and it has magic built into its fabric.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
