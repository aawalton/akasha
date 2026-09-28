import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00048 = {
  id: "01a0e837-3293-7d7b-ad6c-134bbcd04ea5",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-048",
  ownLength: 128,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 48,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  turnStatus: "turn-status/reviewers",
  action: "I try to follow her instructions, sneaking towards her.",
  beats: [
    "He tries it, short steps and soft knees, sneaking across the grass toward her.",
    "The first few steps still thump a little; he shortens them, and they soften.",
    "She shuts her eyes and tilts her head, listening, lips pressed on a smile.",
    '"Heel. Heel. Ooh, that one was quiet."',
    "By the last steps before her, his feet barely whisper on the grass.",
    'She opens her eyes, finds him close, and whoops. "THAT\'S IT! The deer never even knew!"',
    "She throws both hands up in a V, loud enough that a family on a picnic blanket looks over.",
    '"Okay, you earned a real session. Wednesday, six o\'clock, after my shift?"',
    '"Provo River Trail, at the mouth of the canyon. Bring water and your quiet feet."',
  ],
  lore: ["lore/the-dating-game-aelwyn"],
  reviewedBy: ["story-reviewer/style"],
} as const satisfies StoryTurnPlayed
