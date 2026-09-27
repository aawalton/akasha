import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00011 = {
  id: "01a0e348-5c5a-76af-ba2a-5313d80a4947",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-011",
  ownLength: 178,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 11,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  turnStatus: "turn-status/reviewers",
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
    "She lets the words sit a moment, making sure he heard them.",
    "Then she turns, his hand still in hers, and draws him on up the trail beside her.",
  ],
  reviewedBy: ["story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
