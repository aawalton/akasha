import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00049 = {
  id: "01a0e83c-52ff-7bd9-8d0b-af8ff7bebf75",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-049",
  cover: "image/image-dd9bc700e0b23203",
  ownLength: 80,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 49,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action: '"Deal, I\'m looking forward to it!"',
  beats: [
    'He says, "Deal, I\'m looking forward to it!"',
    "\"Yes! Wednesday, six. It's a quest now. Quests are binding.\" She's grinning.",
    "She heads for the bike rack at the edge of the lot, where an old green bike is locked up.",
    '"Homework is quiet feet all week. Grocery store, stairs, everywhere. Sneaky hero mode."',
    "She crouches to work the lock, still talking over her shoulder.",
    '"I\'m editing you in tonight. You look very heroic in that shirt. The comments are gonna love you."',
  ],
  lore: ["lore/the-dating-game-aelwyn", "place/the-dating-game-provo-river-trail"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-27T11:56:00.000Z",
} as const satisfies StoryTurnPlayed
