import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDurgan = {
  id: "01a0ea7c-e4ab-784d-9710-3e5643ee266b",
  type: "page-type/lore",
  slug: "otherwhere-xi-durgan",
  title: "Durgan",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-durgan",
  facts: [
    {
      fact: "Durgan was one of the elite champions of Oleander's Kingdom of Maranor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Durgan died in the final war with most of Maranor's elites; Durgan is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
