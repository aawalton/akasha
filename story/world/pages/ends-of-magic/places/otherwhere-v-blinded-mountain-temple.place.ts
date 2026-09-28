import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVBlindedMountainTemple = {
  id: "01a0e9f9-e637-7275-9d27-53d507198e8f",
  type: "page-type/place",
  slug: "otherwhere-v-blinded-mountain-temple",
  title: "The Temple atop the Blinded Mountain",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-blinded-mountain",
  facts: [
    {
      fact: "An ancient temple on the Blinded Mountain's peak lies shattered by an old explosion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The temple's wizardry and shreds of divinity slow movement and suppress attacks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Questors hold Term meetings at the temple under Davrar's gaze; no attacks are allowed.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
