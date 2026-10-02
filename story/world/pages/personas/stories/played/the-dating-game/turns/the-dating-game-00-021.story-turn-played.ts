import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00021 = {
  id: "01a0e3c2-ce6b-745b-ba86-7e31f6a3edd8",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-021",
  cover: "image/image-b00b994144f16746",
  coverAfter: "The stream circles the whole campus, and the trail keeps to its",
  ownLength: 155,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 21,
  prose: "txt",
  characters: ["character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "While I’m on campus, I decide to take a leisurely walk on the quiet trail next to the stream circling campus, halfway down the hill",
  beats: [
    "While he is on campus, Alan goes halfway down the hill to the quiet trail beside the stream.",
    "The stream circles the campus, and the trail runs along it in the shade.",
    "Willows lean over the water, and the maples along the bank are just starting to turn.",
    "On a Saturday afternoon the trail is nearly empty; he has it almost to himself.",
    "He walks slowly, in no hurry, the stream talking low beside him.",
    "The light comes through the leaves in patches, warm on the path, cool in the shade.",
    "After the canyon's cold walls and the booth's hush, the easy quiet here is its own kind of rest.",
    "Ahead, the trail follows the stream on around the hill.",
  ],
  issues: [
    '"A side path climbs back up ..., and another drops away downhill, toward home." - No Prompt',
    '"another drops away downhill, toward home" - home is uphill of campus (turns 2, 17)',
  ],
  lore: ["place/the-dating-game-byu-stream-trail"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-26T12:25:00.000Z",
} as const satisfies StoryTurnPlayed
