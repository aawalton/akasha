import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSummoning = {
  id: "01a0e9ff-7e03-7ba5-863f-e644247f0ce8",
  type: "page-type/lore",
  slug: "otherwhere-v-summoning",
  title: "Summoning",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-summoning",
  facts: [
    {
      fact: "Summoning magic can pull an outsider in from the universe beyond Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Summoning from beyond is expensive for Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Summoning grows out of research into dimensional magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A mage can scry across dimensions to choose whom a summoning will take.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A carved buzzing rock can serve as a device for summoning a Questor.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
