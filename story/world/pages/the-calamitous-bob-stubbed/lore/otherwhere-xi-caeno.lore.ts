import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiCaeno = {
  id: "01a0ea7c-e4a7-72f6-8584-fc5cb8959e42",
  type: "page-type/lore",
  slug: "otherwhere-xi-caeno",
  title: "Caeno",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-caeno",
  facts: [
    {
      fact: "Caeno was a son of Efestar in the ancient days when Efestar was a mortal assassin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Caeno and his brother Irkal were burned to death, and Emeric's band swore to avenge them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Caeno died before the old gods fell, ages ago; Caeno is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
