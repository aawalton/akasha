import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const blueBoxes00004 = {
  id: "01a14b20-4155-7476-8965-1912810e568d",
  type: "page-type/story-turn-played",
  slug: "blue-boxes-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/blue-boxes"],
  position: 4,
  prose: "txt",
  characters: ["character-player/blue-boxes-nala", "character-other/blue-boxes-iris"],
  stepStatus: "step-status/game-master",
  action:
    '"Umm, if the windows are only supposed to be for facts, how are you using them to talk to me?"',
  lore: ["lore/the-dating-game-iris"],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  roleplayed: true,
  createdAt: "2026-10-17T18:29:27.509Z",
  updatedAt: "2026-10-17T18:30:33.599Z",
  ownLength: 121,
  endsAt: "2026-10-17T16:51:00.000Z",
} as const satisfies StoryTurnPlayed
