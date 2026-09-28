import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVTheBlight = {
  id: "01a0e9f8-1443-70a1-8d25-45c89af36491",
  type: "page-type/place",
  slug: "otherwhere-v-the-blight",
  title: "The Blight",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-blighted-continent",
  facts: [
    {
      fact: "The Blight covers a continent: barren, jagged rock stained black like fresh lava.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The rock is black only in its top foot; beneath lies rich reddish-orange stone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Magic holds the Blight's sky in a permanent overcast of oppressive clouds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Deep in the Blight, daylight is nearly black, with only a faint grey.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Enemies roam the whole Blight without end, like one dungeon the size of a continent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flying over the Blight avoids most threats, save monsters with ranged attacks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A lone rocky hill with sheer cliffs at its summit lies a day's flight into the Blight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inland, a fence of unnatural pillar-like peaks, dense and steep, blocks the way.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At least twenty Grave Tangles cap those peaks, with more beneath them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Past the peaks lies a jagged maze of stone ridges and deltas where living shadows hide.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ridge maze is about two days' flight from the ruined city at the Blight's heart.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beyond the ridges the land rolls gently, roamed by bands of undead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At the Blight's heart lies a ruined city ringed by hills.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
