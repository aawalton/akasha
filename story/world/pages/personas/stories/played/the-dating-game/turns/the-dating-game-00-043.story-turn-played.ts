import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00043 = {
  id: "01a0e815-225f-7d34-9b15-ce15b713720f",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-043",
  ownLength: 137,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 43,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  turnStatus: "turn-status/recorders",
  action: "I join her for the stretches.",
  beats: [
    "He sits down on the grass a little way from her and joins her stretches.",
    'She beams at him. "Yes! Stretch buddy!"',
    "She leads, calling each stretch out loud like a class: hamstrings, then hips, then calves.",
    "Partway through the hamstrings she glances over at him, and her head tilts.",
    '"Tiny note? Back flat, and reach from your hips, not your shoulders. Hinge!"',
    "He tries it, and the stretch lands deeper in the backs of his legs.",
    '"THAT\'S the hinge! Look at you. Natural."',
    "They stand for a quad stretch on one foot each; she holds hers steady as a fence post.",
    "Afterward she flops back in the grass with her arms flung out, squinting up through the pines.",
    "\"Oh, heads up. You're in today's video. It goes up tonight. You're gonna be internet famous.\"",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
