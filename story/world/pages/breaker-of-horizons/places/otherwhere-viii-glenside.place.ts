import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiiGlenside = {
  id: "01a0ea39-5711-7a57-9cf9-6ca551076aa8",
  type: "page-type/place",
  slug: "otherwhere-viii-glenside",
  title: "Glenside",
  world: "world/breaker-of-horizons",
  facts: [
    {
      fact: "Glenside is a small town just east of Creyvlor, north of the capital.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Glenside sits roughly central among its neighbouring cities, a handy place to meet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Honourhall, another town, lies north of Glenside.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
