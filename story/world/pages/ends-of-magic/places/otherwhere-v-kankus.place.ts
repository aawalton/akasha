import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVKankus = {
  id: "01a0e9f7-65b7-7c2e-ac63-29bd8156e23d",
  type: "page-type/place",
  slug: "otherwhere-v-kankus",
  title: "Kankus",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-esebus-continent",
  facts: [
    {
      fact: "Kankus is a port city on a peninsula, a few days from Esebus by cargo carriage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kankus is a dirty, disorganized sprawl of houses over hills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Huge rough-stone seawalls ring Kankus on all sides against the waves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A magic barrier over the harbor keeps water out but lets ships and people through.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ships leave Kankus by a curved channel with wave-suppressing enchantments.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kankus has an office that issues Esebus's identification badges.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Helmaris is over a month's sail from Kankus.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
