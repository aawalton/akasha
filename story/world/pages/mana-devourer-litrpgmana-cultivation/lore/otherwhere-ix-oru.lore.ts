import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxOru = {
  id: "01a0ea41-5f06-756b-94a6-f857dac2a46b",
  type: "page-type/lore",
  slug: "otherwhere-ix-oru",
  title: "Oru",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-oru",
  facts: [
    {
      fact: "Oru is the old bengai who leads the Ashfur band.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oru's mane is grey, one ear torn away, and a hollowmane's claws scar his lower left arm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oru speaks little, and only a few words of Common, slowly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oru judges a stranger by what they do with their hands before they speak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oru is E Grade, the strongest hunter in the Flats save Tamsin Rook in her day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Oru is at the band's camp by the Stillstones.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
