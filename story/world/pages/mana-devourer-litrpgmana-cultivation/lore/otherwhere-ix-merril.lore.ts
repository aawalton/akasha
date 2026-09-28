import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxMerril = {
  id: "01a0ea3d-08c0-7e58-b554-d4a3422de170",
  type: "page-type/lore",
  slug: "otherwhere-ix-merril",
  title: "Merril",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-merril",
  facts: [
    {
      fact: "Merril is an imp who works the carts to the lower levels beneath the Sun City arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merril carries the torch on the prisoner cart down through the monster cavern.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merril is anxious in the dark cavern, where the torch seems all that keeps monsters off.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merril hates his job; the lower levels give him the shits, he says.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merril works beside an older imp with killer arthritis, who slaps him when he talks too much.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Merril is at his cart work beneath the arena.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
