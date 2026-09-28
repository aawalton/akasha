import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiiHanafast = {
  id: "01a0ea38-13c1-7ba7-9193-28bffc5a5e8c",
  type: "page-type/place",
  slug: "otherwhere-viii-hanafast",
  title: "Hanafast",
  world: "world/breaker-of-horizons",
  facts: [
    {
      fact: "Hanafast is a city near the Empire's western border, the side that faces Sedhah.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hanafast has its own Spire; its coverage meets Geldor's in the forests between them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the Academy, a train to Hanafast arrives the next morning.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Last winter Hanafast's train station was bombed, killing people; Hanafast was the hardest hit.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "An abandoned Spire lies near Hanafast.", knowers: ["lore-disclosure/game-master"] },
  ],
  secrets: "jsonl",
} as const satisfies Place
