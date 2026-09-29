import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiLakeSolfis = {
  id: "01a0ea7d-f2b8-7d73-ad69-250a66a75baa",
  type: "page-type/place",
  slug: "otherwhere-xi-lake-solfis",
  title: "Lake Solfis",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-plain-of-the-gods",
  facts: [
    {
      fact: "Lake Solfis is a new reservoir on the Plain of the Gods, below Sinur's Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lake Solfis fills the glassy crater left by the flying fortress Solfis's main gun.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The crater of Lake Solfis is about half a league across.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lake Solfis is filling in late winter and should be full by spring.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lake Solfis is named after the golem Solfis, whose shot made its basin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lake Solfis will water dry New Harrak, where water is scarce.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
