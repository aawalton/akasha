import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereViii00012 = {
  id: "01a0eb28-cc7f-7829-b15c-1c51d321a8ee",
  type: "page-type/story-turn-played",
  slug: "otherwhere-viii-00-012",
  cover: "image/image-e6fa13811221b83c",
  coverAfter: "You hang Maddox's coat on the peg in their place. The apron",
  ownLength: 495,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-viii"],
  position: 12,
  prose: "txt",
  characters: ["character-player/otherwhere-viii-nala", "character-other/otherwhere-viii-hallick"],
  stepStatus: "step-status/player",
  action: "I follow the Master back down and get to work.",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/otherwhere-viii-nala",
    "place/otherwhere-viii-the-workshop",
    "place/otherwhere-viii-the-workshop-room",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-28T09:40:00.000Z",
} as const satisfies StoryTurnPlayed
