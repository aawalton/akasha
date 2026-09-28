import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVTreeborn = {
  id: "01a0e9f4-0047-7739-8ee3-fcdfe6281646",
  type: "page-type/lore",
  slug: "otherwhere-v-treeborn",
  title: "Treeborn",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-treeborn",
  facts: [
    {
      fact: "Many Treeborn tribes live on the plains near Gemore and Agmon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some Treeborn tribes can be bribed to act for outsiders.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some Questors, such as Amoh of Badud's grid, hold the Treeborn in open disgust.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Treeborn are seen among the many peoples of the city of Keihona.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
