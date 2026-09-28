import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVHalsmet = {
  id: "01a0e9f3-cc55-7f92-a0df-4fd710f37f02",
  type: "page-type/place",
  slug: "otherwhere-v-halsmet",
  title: "Halsmet",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-giantsrest-continent",
  facts: [
    {
      fact: "Halsmet is a fortress-city between Giantsrest and Gemore, reached through the mountains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Halsmet lies a short way south of Taeol's research tower, west of Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Halsmet lies across the mountains from Gemore, with Giantsrest beyond it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Halsmet mines ore from the mountains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Scanning magic watches over Halsmet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Halsmet has a brothel that Giantsrest mages visit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A fire elemental haunts a mountain pass above Halsmet.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
