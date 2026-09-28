import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVThia = {
  id: "01a0e9fa-2b5f-77d2-b365-277e0e2cafd3",
  type: "page-type/lore",
  slug: "otherwhere-v-thia",
  title: "Thia",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-thia",
  facts: [
    {
      fact: "Thia is a printer, a slave in the workshops of the Chokiz district of Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Thia's brother Shong is a printer and slave there too.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Thia works the printing presses of the Chokiz district.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
