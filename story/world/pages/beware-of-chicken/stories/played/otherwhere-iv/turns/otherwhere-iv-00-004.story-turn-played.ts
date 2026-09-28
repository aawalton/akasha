import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00004 = {
  id: "01a0ea19-8b21-7aea-9f01-1b70c1341a40",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 4,
  stepStatus: "step-status/game-master",
  action:
    '"I do not have all knowledge, but I might still be able to help. Let us talk while we walk. What possibilities have you considered? What have you eliminated and how?"',
  lore: ["lore/otherwhere-iv-three-stones-folk"],
  endsAt: "2026-09-28T07:10:00.000Z",
} as const satisfies StoryTurnPlayed
