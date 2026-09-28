import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxSesh = {
  id: "01a0ea41-5f06-7a54-a07f-1523b97677df",
  type: "page-type/lore",
  slug: "otherwhere-ix-sesh",
  title: "Sesh",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-sesh",
  facts: [
    {
      fact: "Sesh is the youngest hunter of the Ashfur band, a bengai woman of about eighteen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sesh has a tawny mane in braids, four quick hands, and a sling she never puts down.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sesh is curious about everything and asks too many questions for Oru's liking.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sesh speaks the best Common in the band, learned trading at Tollmere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sesh often ranges alone after grassrunner eggs, south of the band's camp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Sesh is ranging the Flats between the Stillstones and the tinleaf seeps.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
