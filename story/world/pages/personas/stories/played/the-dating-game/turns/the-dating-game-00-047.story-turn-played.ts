import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00047 = {
  id: "01a0e82e-b09b-7661-a482-b794fdc08b54",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-047",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 47,
  turnStatus: "turn-status/writer",
  action: '"Great! How do I fix that?"',
  beats: [
    'He asks, "Great! How do I fix that?"',
    '"Shorter steps. Land under your hips, not out in front of you. Soft knees."',
    "\"Your heel's been slamming on the brakes every step. That's hard on your knees.\"",
    "She hops down onto the park grass to show him, stepping short and easy, knees soft.",
    "\"And here's the cue. Quiet feet. Walk like you're sneaking up on a deer.\"",
    "She pads a few steps across the grass toward him, and her feet make no sound at all.",
  ],
  lore: ["lore/the-dating-game-aelwyn"],
} as const satisfies StoryTurnPlayed
