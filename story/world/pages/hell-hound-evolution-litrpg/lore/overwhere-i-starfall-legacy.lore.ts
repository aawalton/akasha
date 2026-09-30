import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIStarfallLegacy = {
  id: "01a0f20c-f866-75fd-92be-531cb7d45aed",
  type: "page-type/lore",
  slug: "overwhere-i-starfall-legacy",
  title: "Starfall Legacy",
  world: "world/hell-hound-evolution-litrpg",
  about: "overwhere-i-legacy/overwhere-i-starfall-legacy",
  facts: [
    {
      fact: "The water saw is a blast shape of Starfall Surge, not a new skill or legacy way.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Willed thinner and faster, a water disc cuts in about half the time, at the same cost.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
