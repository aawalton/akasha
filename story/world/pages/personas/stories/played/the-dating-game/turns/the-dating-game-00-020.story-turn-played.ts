import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00020 = {
  id: "01a0e3a1-f6b6-7332-b7d6-8e14285f822b",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-020",
  cover: "image/image-703c77379214d405",
  ownLength: 121,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 20,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  turnStatus: "turn-status/player",
  action:
    "I reach out to shake her hand with a huge smile \"It's a date! I'll see you Saturday!\", then turn to leave.",
  beats: [
    "Alan reaches out to shake her hand, smiling hugely: \"It's a date! I'll see you Saturday!\"",
    "Echo takes his hand and shakes it, and holds it a moment past the shake.",
    '"It\'s a date," she gives back, and lets the word date sit there on purpose.',
    "She lets go, and he turns to leave.",
    "He goes back down the quiet hall toward the door.",
    'Behind him, faint through the hush of the empty building, her voice comes after him: "Saturday."',
    "Outside, the lot is still mostly bare and the afternoon sun lies warm across campus.",
  ],
  issues: ['"Rock Canyon opens dark between the mountains, where the day began" - Leave It Open'],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/picture", "story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T12:04:00.000Z",
} as const satisfies StoryTurnPlayed
