import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVHillboarOaks = {
  id: "01a0ea01-27f4-700f-961d-e157785c06c0",
  type: "page-type/place",
  slug: "otherwhere-v-hillboar-oaks",
  title: "The Hillboar Oaks",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-serrin-vale",
  exits: [
    {
      to: "place/otherwhere-v-serrinford",
      way: "North a mile over open meadow, then across the ford to Serrinford's River Gate; forty minutes.",
      direction: "north",
    },
  ],
  facts: [
    {
      fact: "The Hillboar Oaks are rolling oak woods on the Serrin's south side, opposite Serrinford.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The oaks begin a mile south of the ford and run south for days over low hills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In autumn the oaks drop acorns, and herds of hillboars come to root beneath them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ground under the oaks is torn and wallowed by hillboars and smells of pig and leaf mould.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Serrinford men hunt hillboar in the oaks each late autumn, always with rangers along.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Villagers gather mushrooms and acorns at the oaks' edge by day and leave before dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Leaphares are thick in the meadows between the ford and the oaks.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
