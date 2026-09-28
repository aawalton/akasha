import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxLadyShalz = {
  id: "01a0ea40-95f3-7230-a18d-4dec908fbc83",
  type: "page-type/lore",
  slug: "otherwhere-ix-lady-shalz",
  title: "Lady Shalz",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-lady-shalz",
  facts: [
    {
      fact: "Lady Shalz is a noblewoman of Sun City who wears a suit, with all the fierceness of an oligarch.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shalz is a guest at Elasar's private auction, chatty and playful: The husbands too!",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Lady Shalz's whereabouts are unknown, likely among Sun City's elite.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
