import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereViii00004 = {
  id: "01a0ea77-e9bd-773c-8251-906318dcb84f",
  type: "page-type/story-turn-played",
  slug: "otherwhere-viii-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-viii"],
  position: 4,
  stepStatus: "step-status/game-master",
  action:
    '"Sorry, I meant the Institute of course. Still waking up it seems. Point me in the right direction? I\'m not afraid of the hills, give me a chance to clear my head."',
  lore: ["place/otherwhere-viii-guildhall", "place/otherwhere-viii-weir-gardens"],
  endsAt: "2026-09-28T05:55:00.000Z",
} as const satisfies StoryTurnPlayed
