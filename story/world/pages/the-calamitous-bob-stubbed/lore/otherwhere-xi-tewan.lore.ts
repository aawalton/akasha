import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTewan = {
  id: "01a0ea8a-26e4-70d2-9b4c-2c52c1b247f8",
  type: "page-type/lore",
  slug: "otherwhere-xi-tewan",
  title: "Tewan",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-tewan",
  facts: [
    {
      fact: "Tewan was a boy of a frontier village at the northern edge of the Deadshield.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tewan is dead, tortured to death by Octas' Herald during the spider siege.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
