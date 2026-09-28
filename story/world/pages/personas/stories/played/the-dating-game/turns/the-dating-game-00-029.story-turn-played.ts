import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00029 = {
  id: "01a0e555-a6cf-761e-840c-8baf90d77c61",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-029",
  ownLength: 151,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 29,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  turnStatus: "turn-status/writer",
  action:
    "“No, I like the quiet here too. I have a hard time feeling like death is real though. The past, the present, and the future all blur together for me.”",
  beats: [
    'Alan: "No, I like the quiet here too. I have a hard time feeling like death is real though."',
    '"The past, the present, and the future all blur together for me."',
    "Grace slows beside an old headstone, its carved name worn soft by weather.",
    "She lets the lantern light rest on it a moment, then looks at him, grave and curious at once.",
    '"It\'s real," she says gently. "I\'ve never once found it otherwise."',
    "There is no sharpness in it, only certainty, the way someone states the weather.",
    "Then the corner of her red mouth lifts. \"But I'm glad it doesn't sit heavy on you.\"",
    "She walks on between the rows, lantern low, keeping her pace to his.",
    '"All blurred together," she says, turning it over. "What\'s that like, from the inside?"',
  ],
  issues: [
    '"[Grace, Closeness Level 1: ...]" - her closeness level is hidden, never shown in a window',
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
