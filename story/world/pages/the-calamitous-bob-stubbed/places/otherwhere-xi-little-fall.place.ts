import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiLittleFall = {
  id: "01a0ea8a-7b79-798e-a03b-4b66e6b8df22",
  type: "page-type/place",
  slug: "otherwhere-xi-little-fall",
  title: "Little Fall",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-kark-steppes",
  facts: [
    {
      fact: "Little Fall, or Small Fall, is the Red Tribe's gathering place on the Kark steppes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Little Fall has a ridge, a waterfall, a great stone, a pond and stone dwellings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Red Tribe's main encampment lies near Little Fall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Little Fall is about two days by landship from Sky-Mirror Lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Statues of Neriad and Efestar are outside the Red Tribe's encampment by Little Fall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Warchief contests of the Red Tribe are held at Little Fall.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
