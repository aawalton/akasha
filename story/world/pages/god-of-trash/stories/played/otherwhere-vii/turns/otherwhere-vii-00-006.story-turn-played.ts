import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVii00006 = {
  id: "01a0ea75-e62b-7682-accc-9fe4ca22fc93",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vii-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vii"],
  position: 6,
  stepStatus: "step-status/game-master",
  action:
    "\"I'm Nala, not looking for a handout, just a meal for honest work. Happy to do the work first, so you're not risking anything on my lack of reputation. I'm afraid I'm alone here.\"",
  lore: ["lore/otherwhere-vii-aldo-reeve", "place/otherwhere-vii-ashford"],
  endsAt: "2026-09-28T08:09:00.000Z",
} as const satisfies StoryTurnPlayed
