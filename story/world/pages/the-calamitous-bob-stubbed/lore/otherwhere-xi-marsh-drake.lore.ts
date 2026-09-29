import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMarshDrake = {
  id: "01a0ea83-059f-720d-b533-a0dee179c199",
  type: "page-type/lore",
  slug: "otherwhere-xi-marsh-drake",
  title: "Marsh Drake",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-marsh-drake",
  facts: [
    {
      fact: "Marsh drakes are small reptiles that breathe fire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The rich keep marsh drakes as expensive pets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A young dragon can pass for a marsh drake to an untrained eye.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
