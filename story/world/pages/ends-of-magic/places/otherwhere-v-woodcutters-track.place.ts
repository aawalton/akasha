import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVWoodcuttersTrack = {
  id: "01a0e9fb-d4a1-7435-b342-e04a79f494a1",
  type: "page-type/place",
  slug: "otherwhere-v-woodcutters-track",
  title: "The Woodcutters' Track",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-greyscale-wood",
  exits: [
    {
      to: "place/otherwhere-v-fern-hollow",
      way: "Up the brook from the log bridge, a mile and a half through fern; an hour barefoot.",
      direction: "north",
    },
    {
      to: "place/otherwhere-v-serrinford",
      way: "West and downhill along the track four and a half miles to Serrinford; an hour and a half.",
      direction: "west",
    },
    {
      to: "place/otherwhere-v-scalebark-camp",
      way: "East and uphill along the track half a mile to the logging camp; ten minutes.",
      direction: "east",
    },
  ],
  facts: [
    {
      fact: "The Woodcutters' Track is a rutted cart track along the wood's southern slope.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fern Hollow's brook reaches the track a mile and a half below the hollow, at a log bridge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the log bridge the track runs west four and a half miles downhill to Serrinford.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the log bridge the track climbs east half a mile to the Scalebark logging camp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The track is two deep ruts of packed earth and grit, with grass and dung down the middle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Notched posts mark each mile of the track, cut with Elothian letters counting from Serrinford.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stumps, sawdust and stacked scalebark logs line the track's upper reach near the camp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Woodcutters walk up the track from Serrinford at first light and reach the bridge by seven.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ox carts come up empty each morning and go down loaded with logs in the afternoon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The woodcutters leave the camp an hour before sunset; after dusk the track is empty.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On the track's lower reach, at Oak Bend, a hillboar sow with five piglets roots in the bracken.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oak Bend lies a mile and a half above Serrinford, where oaks crowd the track's lower side.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The sow charges anyone who comes near her piglets; carters bang pots to warn her off.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A person who backs off slowly past Oak Bend, making noise, is usually let go by the sow.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
