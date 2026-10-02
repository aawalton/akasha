import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00011 = {
  id: "01a0e348-5c5a-76af-ba2a-5313d80a4947",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-011",
  cover: "image/image-002ac2e171c34b24",
  coverAfter: "Then she smiles and slowly shakes her head. It's a gentle shake,",
  ownLength: 133,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 11,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    '"Oh! Another LitRPG enthusiast! I\'m so excited I could kiss you right now. I mean..." I stop and turn to face her "Could I? Kiss you right now? I know we just met today, but I really like you."',
  beats: [
    'Alan: "Oh! Another LitRPG enthusiast! I\'m so excited I could kiss you right now. I mean..."',
    "He stops on the trail and turns to face her.",
    '"Could I? Kiss you right now? I know we just met today, but I really like you."',
    "Echo goes still, and color climbs up her freckled throat into her cheeks.",
    "She searches his face for a long moment, not pulling her hand from his.",
    "Then she smiles and slowly shakes her head, gentle, not a door closing.",
    '"We just met today," she gives back, soft, almost apologetic.',
    "She squeezes his hand hard, and her eyes stay on his.",
    '"But I really like you."',
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T09:51:00.000Z",
} as const satisfies StoryTurnPlayed
