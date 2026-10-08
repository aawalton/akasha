import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiiMyordin = {
  id: "01a0ea38-ca4d-7230-9731-ec88b5a0655c",
  type: "page-type/place",
  slug: "otherwhere-viii-myordin",
  title: "Myordin",
  world: "world/breaker-of-horizons",
  facts: [
    {
      fact: "Myordin is a city south of Geldor, the capital.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Myordin lies within Spire coverage, as every Aiestan city does.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T22:53:05.485Z",
  updatedAt: "2026-09-28T22:53:16.000Z",
} as const satisfies Place
