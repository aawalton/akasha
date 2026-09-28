import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxDrathoksDaughter = {
  id: "01a0ea3d-a2ca-7986-ac52-df62f458bc9b",
  type: "page-type/lore",
  slug: "otherwhere-ix-drathoks-daughter",
  title: "Drathok's Daughter",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-drathoks-daughter",
  facts: [
    {
      fact: "Drathok's daughter is the child of the imp baron Drathok, born to him in his old world.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Drathok's daughter has not been seen beneath the Sun City arena.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
