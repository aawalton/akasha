import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiiHonourhall = {
  id: "01a0ea39-bd8f-765e-a04e-a2340cc44899",
  type: "page-type/place",
  slug: "otherwhere-viii-honourhall",
  title: "Honourhall",
  world: "world/breaker-of-horizons",
  facts: [
    {
      fact: "Honourhall is a town north of Glenside, toward the mountains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Past Honourhall lies a thin-coverage zone, and beyond it an abandoned Spire near the mountains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Folk avoid abandoned Spires; wild arcana gathers round them and takes years to settle.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
