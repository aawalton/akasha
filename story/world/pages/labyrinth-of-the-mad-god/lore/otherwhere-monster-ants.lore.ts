import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereMonsterAnts = {
  id: "01a0e9c4-861d-79ab-8d21-6871cc04eda3",
  type: "page-type/lore",
  slug: "otherwhere-monster-ants",
  title: "Monster Ants",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Monster ants are the size of large dogs, with glossy brown shells and crimson markings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their mandibles punch through armor, and their barbed stingers drip oily venom.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They swarm from sinkholes by the thousand and hunt for city cores.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A queen's aura from the nest buffs and coordinates the swarm.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
