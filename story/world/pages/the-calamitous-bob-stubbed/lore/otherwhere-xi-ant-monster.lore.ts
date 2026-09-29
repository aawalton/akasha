import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAntMonster = {
  id: "01a0ea84-e790-7c72-99af-5e5741522c03",
  type: "page-type/lore",
  slug: "otherwhere-xi-ant-monster",
  title: "Ant Monster",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-ant-monster",
  facts: [
    {
      fact: "A giant ant monster roams the deep desert of Sandsong in Vizim.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Desert travellers crossing Sandsong count the ant monster among the dangers of the sands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Acid ants are among the lesser beasts known around Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
