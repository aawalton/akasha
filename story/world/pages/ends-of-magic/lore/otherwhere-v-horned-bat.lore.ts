import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVHornedBat = {
  id: "01a0e9fc-aa25-754d-9685-ddf82461c58f",
  type: "page-type/lore",
  slug: "otherwhere-v-horned-bat",
  title: "Horned Bat",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-horned-bat",
  facts: [
    {
      fact: "Horned bats are undead fliers with torpedo-shaped bodies and three enchanted lance horns.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A horned bat wears a cloak of death mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Horned bats dive in swarms, and their horns pierce ordinary force shields.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Larger horned fliers, big as small ships, shriek together in a wall of sonic magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Horned bats swarm the skies over undead blights, threatening anyone who flies there.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
