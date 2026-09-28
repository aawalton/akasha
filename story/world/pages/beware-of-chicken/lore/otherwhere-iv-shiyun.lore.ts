import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvShiyun = {
  id: "01a0ea0c-77a7-7513-8573-fa40bdbb67f3",
  type: "page-type/lore",
  slug: "otherwhere-iv-shiyun",
  title: "The Crone (Shiyun)",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "The Crone of Verdant Hill is an old woman, blind in one eye, who lives in a shack by the town wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Crone carves animal and human figures marked with strange characters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Crone practices divination, though she says her power and accuracy have faded with age.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Crone gave Bi De his map of the Azure Hills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Crone keeps Laoshi, a three-legged tomcat, and Lanfan, a goat far faster than normal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Crone is married to Shu, a mortal man.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This spring the Crone still lives and carves in her Verdant Hill shack.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
