import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00004 = {
  id: "01a0e304-a845-7da8-b30a-7516322ca43d",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-004",
  cover: "image/image-bf1c87f7fd4f5385",
  coverAfter: "So it goes, on up the canyon. Now and then you knock",
  ownLength: 238,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 4,
  prose: "txt",
  characters: ["character-player/the-dating-game-alan", "character-other/the-dating-game-echo"],
  stepStatus: "step-status/player",
  action:
    "I like that she's walking close, and I bump my shoulder gently into hers from time to time. \"I'm Alan, what's your name?\"",
  beats: [
    "Walking on up the canyon, Alan bumps his shoulder gently into hers.",
    "She glances at him, surprised, then laughs without a sound, just breath and a bright look.",
    "A few steps on she bumps him back, a little harder, eyes on the trail as if innocent.",
    "He keeps it up now and then, and she answers each bump in kind.",
    "Then he says: \"I'm Alan, what's your name?\"",
    '"Alan," she says, trying it slowly, as if tasting it.',
    "She touches two fingers to her own chest.",
    '"Echo," she says.',
    "It is the first word she has given him since he called up to her that was not his.",
    "The walls give the word back once, faint, from up the canyon.",
  ],
  issues: [
    '"Echo," she says - she speaks only words given back to her, and no one has said "Echo"',
  ],
  lore: ["lore/the-dating-game-boulder-woman"],
  reviewedBy: ["story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory"],
  endsAt: "2026-09-26T09:32:00.000Z",
} as const satisfies StoryTurnPlayed
