import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVGreyscaleWood = {
  id: "01a0e9fb-1360-72da-be25-c5205b4192bc",
  type: "page-type/place",
  slug: "otherwhere-v-greyscale-wood",
  title: "The Greyscale Wood",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-serrin-vale",
  exits: [
    {
      to: "place/otherwhere-v-fern-hollow",
      way: "Up the brook from the woodcutters' track, a mile and a half of fern and moss; an hour barefoot.",
      direction: "north",
    },
    {
      to: "place/otherwhere-v-serrin-vale",
      way: "Downhill by any stream to the woodcutters' track, then down the track to the river.",
      direction: "south",
    },
    {
      to: "place/otherwhere-v-treeborn-grove",
      way: "East into the deep wood toward the Treeborn grove; a day and a half on foot.",
      direction: "east",
    },
    {
      to: "place/otherwhere-v-thornmouth",
      way: "North along the ridges toward the Thornmouth cleft; two days on foot.",
      direction: "north",
    },
  ],
  facts: [
    {
      fact: "The Greyscale Wood is an old forest of scalebark trees on the Serrin Vale's northern slopes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Scalebark trunks rise straight and bare for sixty feet before their bluish crowns.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Under the canopy the light is dim and blue-green; the ground is moss, fern and shed scales.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The wood smells of resin, wet moss and something sharp like crushed pepper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A mile through the wood takes about forty minutes barefoot, and twenty on a track.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shed bark scales on the ground are hard-edged and nick bare feet that drag or slip.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Every stream in the wood's south runs downhill to the woodcutters' track and the Serrin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The wood runs north for many days, and east into deep wood where the Treeborn live.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Serrinford's woodcutters fell scalebark along the wood's southern edge, by the track.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gloamcats hunt the wood at night; no villager sleeps out in it without a fire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season thornlings stray south from Thornmouth, some within a day of the hollow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brookberry, gloamberry, hollowbell and cordnettle grow in the wood's clearings and streams.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Leaphares, click-lizards, lamp-moths and lantern-owls are common all through the wood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stingmidges swarm over the wood's still pools at dawn and dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
