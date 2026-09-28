import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVii00002 = {
  id: "01a0ea21-6f9d-71b9-921d-f759c9443e7b",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vii-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vii"],
  position: 2,
  stepStatus: "step-status/game-master",
  action:
    "I pull myself out of the ditch as best I can then look to see who is coming up the road.",
  lore: [
    "lore/otherwhere-vii-ennis",
    "place/otherwhere-vii-bramwick",
    "place/otherwhere-vii-ashford-road-ditch",
  ],
  endsAt: "2026-09-28T06:16:00.000Z",
} as const satisfies StoryTurnPlayed
