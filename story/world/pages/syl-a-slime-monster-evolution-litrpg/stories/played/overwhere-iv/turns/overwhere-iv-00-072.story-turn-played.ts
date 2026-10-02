import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00072 = {
  id: "01a0fe86-ce05-77fd-aaf9-ec784282797c",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-072",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 72,
  stepStatus: "step-status/game-master",
  action:
    "I blow the horn, then watch to see what the torches do, ready to slice goblins if they approach",
  lore: ["place/overwhere-iv-the-tangle", "place/overwhere-iv-tull-farm"],
  endsAt: "2026-10-06T06:30:00.000Z",
} as const satisfies StoryTurnPlayed
