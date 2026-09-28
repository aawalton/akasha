import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxSmallFolk = {
  id: "01a0ea36-c313-7ebf-a131-b84aeb92f8eb",
  type: "page-type/lore",
  slug: "otherwhere-ix-small-folk",
  title: "Small folk",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-small-folk",
  facts: [
    {
      fact: "The small folk are short, near-human beings, in looks something like dwarves or gnomes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Small folk turn up among the crowds that fill the Sun City arena's stands to watch the bouts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In Sun City's crowds, small folk are among the few beings that look nearly human at all.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
