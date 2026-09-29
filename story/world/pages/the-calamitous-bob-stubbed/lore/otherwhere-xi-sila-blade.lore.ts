import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSilaBlade = {
  id: "01a0ea89-57b6-74aa-abfd-b9b4dad01f67",
  type: "page-type/lore",
  slug: "otherwhere-xi-sila-blade",
  title: "Sila Blade",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-sila-blade",
  facts: [
    {
      fact: "Sila Blade was one of the elite champions of Oleander's Kingdom of Maranor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sila Blade is dead, one of the many Maranorian elites who fell in the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
