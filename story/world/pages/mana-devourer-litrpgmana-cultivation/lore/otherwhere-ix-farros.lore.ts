import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxFarros = {
  id: "01a0ea35-dfa7-7aaf-82dc-f7ffc86ae06c",
  type: "page-type/lore",
  slug: "otherwhere-ix-farros",
  title: "Farros",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-farros",
  facts: [
    {
      fact: "Farros is the God of Temperance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Farros controls the Malar Zone, an F Grade zone beside the desert of Materia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Farros took the Malar region about six hundred years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Magul dynasty took its throne at about the same time Farros took the region.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Farros holds the Malar Zone as he has for six centuries; he is not seen abroad.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
