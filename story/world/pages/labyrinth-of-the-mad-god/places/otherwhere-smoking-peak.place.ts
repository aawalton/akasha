import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereSmokingPeak = {
  id: "01a0e99b-64b2-7217-8406-0cd425b59ebb",
  type: "page-type/place",
  slug: "otherwhere-smoking-peak",
  title: "The Smoking Peak",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-cinder-isle",
  facts: [
    {
      fact: "The Smoking Peak is the isle's volcano, some six thousand feet, bare above the Highlands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its upper slopes are loose ash and cinder, hard to climb and quick to slide.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vents on its flanks breathe hot, sour air that stings the eyes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its crater smokes day and night and glows dull red after dark.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
