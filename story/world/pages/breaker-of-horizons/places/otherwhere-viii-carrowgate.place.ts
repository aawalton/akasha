import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiiCarrowgate = {
  id: "01a0ea28-e273-7d5a-b3d1-8b0c90425c6e",
  type: "page-type/place",
  slug: "otherwhere-viii-carrowgate",
  title: "Carrowgate",
  world: "world/breaker-of-horizons",
  facts: [
    {
      fact: "Carrowgate is a provincial city of the Aiestan Empire, on the river Carrow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Carrowgate lies far south of Geldor, the capital, and knows the capital mostly from the news.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Carrowgate is a mill and river-trade city of some two hundred thousand people.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Spire rises at Carrowgate's heart, and its coverage spans the city and the farms around.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Low Bank is an old working district of warehouses, flats and cheap eateries by the weir.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Weir Street runs past Weir Gardens, and a small police post sits at its north end.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A charity kitchen on Tanners Row, Low Bank, feeds anyone who queues at dawn and at dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
