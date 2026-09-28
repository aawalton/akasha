import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSplitLog = {
  id: "01a0e9ff-1528-78f6-b8dd-061f068616a7",
  type: "page-type/place",
  slug: "otherwhere-v-split-log",
  title: "The Split Log",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-serrinford",
  exits: [
    {
      to: "place/otherwhere-v-serrinford",
      way: "Out into the lane that runs from the green down to the River Gate.",
    },
  ],
  facts: [
    {
      fact: "The Split Log is Serrinford's only inn and alehouse, a low timber house by the River Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its sign is a real scalebark log split down the middle and hung over the entrance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The common room has one long table, benches, a hearth, and a barrel of barley ale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Upstairs are three small rooms with beds; a loft over the stable holds straw pallets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Split Log serves barley ale, bean-and-pork stew, fried river fish and flat barley bread.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A cup of ale is one tesk, a bowl of stew with bread three, a loft pallet two, a bed five.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Woodcutters crowd the common room each evening after the gates close.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Harrowmere trader and raftsmen sleep at the Split Log on trade nights.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Split Log needs someone to haul water, scrub pots and muck the stable.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
