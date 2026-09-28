import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVShong = {
  id: "01a0e9fa-2b5f-7c6d-bcbb-20b8a9693441",
  type: "page-type/lore",
  slug: "otherwhere-v-shong",
  title: "Shong",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-shong",
  facts: [
    {
      fact: "Shong is a printer, a slave in the workshops of the Chokiz district of Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shong is the brother of Thia, a printer and slave there too.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Shong works the printing presses of the Chokiz district.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
