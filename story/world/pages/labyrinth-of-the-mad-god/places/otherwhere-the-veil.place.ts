import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereTheVeil = {
  id: "01a0e9bc-75a1-758f-8666-2745e7384a02",
  type: "page-type/place",
  slug: "otherwhere-the-veil",
  title: "The Veil",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-earth",
  facts: [
    {
      fact: "The Veil is the codex's name for the inky darkness draped over regions of Earth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The codex entry on the Veil stays locked until someone meets it in person.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
