import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiPakar = {
  id: "01a0ea80-a39d-7f4d-8078-0c0151356d62",
  type: "page-type/lore",
  slug: "otherwhere-xi-pakar",
  title: "Pakar",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-pakar",
  facts: [
    {
      fact: "A pakar is an anteater-like beast of the steppes with the forelegs of a bear.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pakar moves with a bounding, hopping gait.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pakar has a keen nose and feels tremors in the ground.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The kark ride pakars, and kark pakar riders form their cavalry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Archers facing pakar riders aim for the pakar's sensitive nose.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pakars are a kark measure of wealth, bought with iron and paid as bride price.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pakars are bought and sold at the Great Bazaar on Sky-Mirror Lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kark drink the fermented milk of pakar mares.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
