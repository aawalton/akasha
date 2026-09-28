import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVMaelstrom = {
  id: "01a0e9fb-8e1a-7e3e-b539-397973cbe939",
  type: "page-type/place",
  slug: "otherwhere-v-maelstrom",
  title: "The Maelstrom",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-oceans",
  facts: [
    {
      fact: "The Maelstrom is a watery domain in the sea off Ostren, ruled by the Maestro.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
