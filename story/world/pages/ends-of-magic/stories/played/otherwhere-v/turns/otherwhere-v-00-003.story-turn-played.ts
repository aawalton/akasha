import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereV00003 = {
  id: "01a0ea04-8c6d-79e6-a576-e21c41f65380",
  type: "page-type/story-turn-played",
  slug: "otherwhere-v-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-v"],
  position: 3,
  stepStatus: "step-status/game-master",
  action:
    "**Okay, no help yet, but if I survive, l get something. Spring gives fresh water as good a place to start as any. Spiral search pattern outward, learn what is near by, eyes peeled for danger. Pay close attention to everything, maybe I can get an inspect skill.** Plan in place, I put it into motion, slowly circling outward from the spring to find opportunities or threats in the immediate area.",
  lore: ["place/otherwhere-v-fern-hollow", "lore/otherwhere-v-gloamcat"],
  endsAt: "2026-09-28T18:58:00.000Z",
} as const satisfies StoryTurnPlayed
