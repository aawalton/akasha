import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSansal = {
  id: "01a0e9f5-4f84-7f72-8b5b-19ef07fda007",
  type: "page-type/place",
  slug: "otherwhere-v-sansal",
  title: "Sansal",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "Sansal is a remote backwater with a ruined fortress built around a Seal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The fortress's ancient stonework is masterful but has collapsed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A ruined stone wasteland stretches beyond Sansal's fortress.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
