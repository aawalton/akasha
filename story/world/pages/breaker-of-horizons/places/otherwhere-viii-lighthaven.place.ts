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
} as const satisfies Place
