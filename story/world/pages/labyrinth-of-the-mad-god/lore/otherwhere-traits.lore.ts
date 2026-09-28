import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereTraits = {
  id: "01a0e9a3-9f55-7ced-a2b2-b73c8bd065f0",
  type: "page-type/lore",
  slug: "otherwhere-traits",
  title: "Traits",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Geneline traits belong to a whole species and pass to every member.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gift of Tongues does not translate writing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bloodline traits are personal and are inherited by one's descendants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bloodline slots are few; an E-grade person has about three.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Class traits can be bound into a bloodline so they survive a class change.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Great deeds can earn unique traits, such as needing half the usual food, water and sleep.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Traits can be enhanced, strengthening their effect without taking another slot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
