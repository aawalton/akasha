import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00060 = {
  id: "01a0f493-58d5-736b-9219-6417774611e4",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-060",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 60,
  stepStatus: "step-status/game-master",
  action:
    "“I’ll pay you two silver now for information on what a drake-pearl is good for. Is it something I could use?”",
  lore: ["lore/overwhere-i-greyfen-beasts-2", "lore/overwhere-i-osric-fenn"],
  endsAt: "2026-10-01T18:00:00.000Z",
} as const satisfies StoryTurnPlayed
