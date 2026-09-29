import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiBeatrice = {
  id: "01a0ed33-8989-7457-86ab-70fecdb4e6d3",
  type: "page-type/lore",
  slug: "overwhere-iii-beatrice",
  title: "Beatrice",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-beatrice",
  facts: [
    {
      fact: "Beatrice is a young, beautiful human mage with vivid green eyes and a husky voice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She wears revealing dresses and has a sadistic cackle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She cast holy magic through a dungeon wand that amplified it; she lost it in Sunvale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She charges even her comrades for healing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She fled Sunvale with a bloody hand, with Walter and Arvid.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
