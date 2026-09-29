import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiWalter = {
  id: "01a0ed33-8989-7b2f-b2c2-74dde7d4d205",
  type: "page-type/lore",
  slug: "overwhere-iii-walter",
  title: "Walter",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-walter",
  facts: [
    {
      fact: "Walter is an older human mage, violent and crude, who fights with a wand and a staff.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "A large scar runs down his right cheek.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "A magpie pecked off his finger; Beatrice set it back on crooked, for a fee.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The same bird snapped his arm with a dive.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He, Beatrice and Arvid lodged at the Sunvale inn, bullied the town and terrorised its children.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He fled Sunvale screaming that the bird was a demon.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
