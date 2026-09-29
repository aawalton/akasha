import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSur = {
  id: "01a0ea89-57b6-7e5a-a7fa-184b3752fae1",
  type: "page-type/lore",
  slug: "otherwhere-xi-sur",
  title: "Sur",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-sur",
  facts: [
    {
      fact: "Sur was one of the elite champions of Oleander's Kingdom of Maranor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sur is dead, fallen with most of Maranor's elites when Oleander slew Judgment at Aristan.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
