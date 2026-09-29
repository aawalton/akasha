import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTerilasani = {
  id: "01a0ea8a-f293-7b16-8241-a6adb4621fd9",
  type: "page-type/lore",
  slug: "otherwhere-xi-terilasani",
  title: "Terilasani",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-terilasani",
  facts: [
    {
      fact: "General Terilasani was a general of Oleander's army of Maranor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Terilasani's army is broken, and his fate after the rout is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
