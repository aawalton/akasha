import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxReisha = {
  id: "01a0ea3f-a3e9-7859-8f7d-4e43c8e405c8",
  type: "page-type/lore",
  slug: "otherwhere-ix-reisha",
  title: "Reisha",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-reisha",
  facts: [
    {
      fact: "Reisha is a woman in Randall's service, the fighter he was expected to set on Markus Brown.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The altok acolyte took Reisha's place in Randall's bout.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Randall said of Reisha only that she is still whole.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Reisha's whereabouts are unknown, likely among Randall's followers.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
