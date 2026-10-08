import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiiLighthaven = {
  id: "01a0ea38-71f0-77e4-833c-526cf5e0df8b",
  type: "page-type/place",
  slug: "otherwhere-viii-lighthaven",
  title: "Lighthaven",
  world: "world/breaker-of-horizons",
  facts: [
    {
      fact: "Lighthaven is a city on the Empire's eastern shore, by the sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lighthaven lies east of Geldor, the capital, at the far side of the Empire from Sedhah.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T22:52:42.864Z",
  updatedAt: "2026-09-28T22:52:49.000Z",
} as const satisfies Place
