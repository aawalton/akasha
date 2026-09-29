import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXHarrowLockUp = {
  id: "01a0eb2e-8a77-7278-8e14-cc82b951c1d1",
  type: "page-type/place",
  slug: "otherwhere-x-harrow-lock-up",
  title: "Harrow Lock-Up",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  within: "place/otherwhere-x-harrow",
  facts: [
    {
      fact: "Harrow's lock-up is a round stone hut by the pound, with an oak door and a barred slot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The lock-up holds drunks and thieves overnight: a straw pallet, a bucket, no fire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The reeve keeps the lock-up key on his belt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A night in the lock-up in autumn is a cold night, and Harrow would talk of it for a year.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  exits: [
    {
      to: "place/otherwhere-x-harrow-green",
      way: "across the corner of the green by the pound",
    },
  ],
} as const satisfies Place
