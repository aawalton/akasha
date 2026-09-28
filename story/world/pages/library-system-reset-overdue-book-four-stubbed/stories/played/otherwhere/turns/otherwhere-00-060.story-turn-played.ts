import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00060 = {
  id: "01a0e7f5-58d9-78e3-8af8-a685ad675808",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-060",
  cover: "image/image-f7d67eb9e0f6db84",
  ownLength: 138,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 60,
  prose: "txt",
  characters: ["character-player/otherwhere-alan"],
  turnStatus: "turn-status/player",
  action: "I go down the basement and put my hands on the core again",
  beats: [
    "Nala winds down the spiral staircase into the round chamber, lit its dim blue-green.",
    "The walk across the springy matting to the trunk is an ordinary walk now.",
    "The two knots of light pulse side by side; she lays a hand on each, shoulder-width apart.",
    "Heat burns up her arms and through her veins, and the chamber falls away.",
    "She sees the Check-in Counter long ago, bright and busy, patrons of every kind lined up before it.",
    "Scaled and feathered and furred, tall and tiny, all waiting their turn at the carved desk.",
    "The vision thins, and she is back at the trunk, arms tingling, breathing hard, unhurt.",
    "A window opens: Synchronization Complete.",
    "A second window unfolds beneath it, one she has never seen: Tasks.",
    "Current Task: Restore the Check-in Counter. Library Power: 72 / 75.",
  ],
  issues: [
    '"Librarian Link: Connection 3" - Library states connection only when a task asks for it',
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-28T13:38:00.000Z",
} as const satisfies StoryTurnPlayed
