import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxStillstones = {
  id: "01a0ea42-0b6b-7f10-b5c3-e4670fa20c00",
  type: "page-type/place",
  slug: "otherwhere-ix-stillstones",
  title: "The Stillstones",
  world: "world/mana-devourer-litrpgmana-cultivation",
  facts: [
    {
      fact: "The Stillstones are a ring of eleven standing stones in the Flats, two days north of Tollmere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inside the Stillstones the glassgrass does not ring, even in high wind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A broken shrine of Ignoa sits in the ring: a toppled altar slab and a headless statue.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ignoa's temples were destroyed long ago; Kessen folk keep away from the Stillstones.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A spring rises in the ring's east side, the best water in the northern Flats.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hollowmanes will not enter the ring; the silence there unsettles them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season the Ashfur band camps beside the Stillstones.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
