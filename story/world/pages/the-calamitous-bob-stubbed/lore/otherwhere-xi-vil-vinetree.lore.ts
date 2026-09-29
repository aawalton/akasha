import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiVilVinetree = {
  id: "01a0ea89-57b6-72f9-be2c-b5cb7f088cfa",
  type: "page-type/lore",
  slug: "otherwhere-xi-vil-vinetree",
  title: "Vil Vinetree",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-vil-vinetree",
  facts: [
    {
      fact: "Vil Vinetree was one of the elite champions of Oleander's Kingdom of Maranor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vil Vinetree is dead, fallen with most of Maranor's elites when Oleander slew Judgment.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
