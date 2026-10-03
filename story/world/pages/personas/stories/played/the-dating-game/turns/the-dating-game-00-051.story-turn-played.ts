import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00051 = {
  id: "01a0e848-4c03-75bb-ad50-459160211267",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-051",
  cover: "image/image-7882332d52412fa2",
  coverAfter: "She looks about twenty-five, with dark hair, warm olive skin and thick,",
  ownLength: 145,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 51,
  prose: "txt",
  characters: ["character-other/the-dating-game-talia", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action: "I'm feeling social, so I keep an eye out for people to talk to while I walk.",
  beats: "jsonl",
  lore: ["place/the-dating-game-apple-avenue", "lore/the-dating-game-talia"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-27T13:41:00.000Z",
} as const satisfies StoryTurnPlayed
