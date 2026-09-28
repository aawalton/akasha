import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVScalebarkCamp = {
  id: "01a0e9fc-6d9e-76ab-8433-3b0bf767f31c",
  type: "page-type/place",
  slug: "otherwhere-v-scalebark-camp",
  title: "Scalebark Camp",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-greyscale-wood",
  exits: [
    {
      to: "place/otherwhere-v-woodcutters-track",
      way: "West down the track half a mile to the log bridge; ten minutes. Serrinford is five miles on.",
      direction: "west",
    },
    {
      to: "place/otherwhere-v-greyscale-wood",
      way: "East along skid trails a quarter mile to the cutting face, then deep wood beyond.",
      direction: "east",
    },
    {
      to: "place/otherwhere-v-fern-hollow",
      way: "North-west uphill through trackless forest, about a mile and a half; an hour barefoot.",
      direction: "north",
    },
  ],
  facts: [
    {
      fact: "Scalebark Camp is a logging camp in a clearing of stumps beside the Woodcutters' Track.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The camp lies half a mile east of the log bridge, two miles from Fern Hollow by the brook.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An open shelter of bark slabs covers a trestle table and a stone fire ring.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A rail pen holds the camp's four oxen by day; a chained bark chest holds its axes and saws.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A cow horn hangs from the shelter post to call the crew or warn of beasts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Twelve to fifteen woodcutters work the camp by day under the foreman Brannoc Tull.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The crew fells scalebark, strips its scales, and drags the logs to the carts with oxen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Midday at the camp is barley bread, hard cheese, onions and a pot of bean-and-bacon stew.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The camp is empty at night: the crew takes the oxen and food down and banks the fire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The camp is three hands short this season and takes anyone who can haul or strip bark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The camp pays helpers in food: two meals a day and a loaf to carry home.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The cutting face lies a quarter mile east of the camp and moves east each season.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ten days ago the crew found a ring of shed antlers laid on a fresh stump at the cutting face.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The crew argues over the antler ring; some call it a Treeborn warning, some a jest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The camp smells of fresh resin, sawdust, oxen and woodsmoke.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
