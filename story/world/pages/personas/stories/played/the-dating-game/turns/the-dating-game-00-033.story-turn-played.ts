import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00033 = {
  id: "01a0e574-c321-79ef-a4d7-09f74c16e5f4",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-033",
  cover: "image/image-edc201c13dbc0e48",
  coverAfter: "Grace stops on the path and turns to face you fully, the",
  ownLength: 141,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 33,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "I tear up. “That’s good work. Heavy. My father and grandfather both went through hospice in the past few years. I know exactly how much a good hospice nurse matters. I can tell you’re a good one.”",
  beats: [
    "Alan's eyes fill. \"That's good work. Heavy.\"",
    '"My father and grandfather both went through hospice in the past few years."',
    '"I know exactly how much a good hospice nurse matters. I can tell you\'re a good one."',
    "Grace stops on the path and turns to face him fully, the lantern held low and steady.",
    "She doesn't hurry past his tears or look away from them; she stays right there with him.",
    '"Thank you," she says quietly. "That means more than you\'d think, from someone who\'s been there."',
    '"I\'m not a nurse, just the one who sits up with them. But the nurses are the ones who carry it."',
    "She is quiet a moment, and the evening settles around them among the stones.",
    '"Your father, and your grandfather," she says gently. "Tell me about them, if you want to."',
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-26T19:34:00.000Z",
} as const satisfies StoryTurnPlayed
