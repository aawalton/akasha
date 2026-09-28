import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVHeadmansLonghouse = {
  id: "01a0e9fe-958c-7af9-ae81-eb7f706cb0a5",
  type: "page-type/place",
  slug: "otherwhere-v-headmans-longhouse",
  title: "The Headman's Longhouse",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-serrinford",
  exits: [
    {
      to: "place/otherwhere-v-serrinford-green",
      way: "Out the carved double door onto the green.",
      direction: "south",
    },
  ],
  facts: [
    {
      fact: "The headman's longhouse is a long timber hall on the green's north side, forty paces long.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A long hearth runs down the hall's middle, and smoke leaves through a slot in the roof.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The roof posts are carved with the faces of Serrinford's founding families.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The village moot meets in the longhouse, and the headman hears disputes there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A guest corner by the door holds two straw pallets and a wool blanket for gate-bread guests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The headman's family sleeps behind a hide curtain at the hall's far end.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The village chest and the timber tally-sticks are kept locked under the headman's bed.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
