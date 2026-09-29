import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiOldGreyhand = {
  id: "01a0ed31-66ee-7f9f-adf6-c9448a208401",
  type: "page-type/lore",
  slug: "overwhere-iii-old-greyhand",
  title: "Old Greyhand",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-old-greyhand",
  facts: [
    {
      fact: "Old Greyhand is a treant of the deep Wrenwood, a tree monster old past anyone's memory.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He looks like a vast gray beech with one limb crooked like a hand, and moves only at need.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Woodfolk say he harms only those who harm the wood, and they leave him nuts and flowers.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
