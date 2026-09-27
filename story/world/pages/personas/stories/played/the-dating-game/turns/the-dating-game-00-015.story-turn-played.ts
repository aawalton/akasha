import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00015 = {
  id: "01a0e36a-84cc-7c62-b363-11e3a57defe3",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-015",
  ownLength: 124,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 15,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  turnStatus: "turn-status/reviewers",
  action:
    '"You think you could do it? I\'d love a partner on this. Can you make a voice after reading the text without hearing it first?"',
  beats: [
    'Alan: "You think you could do it? I\'d love a partner on this."',
    '"Can you make a voice after reading the text without hearing it first?"',
    "Echo's squint melts into a slow, pleased smile.",
    '"I\'d love a partner on this," she gives back, meaning it, though her eyes stay a touch careful.',
    "She nods at the rest, sure of herself, as easy as a craftswoman asked if she can use her tools.",
    '"Without hearing it first," she says, and taps her throat: yes.',
    "Then she holds out her open palm to him, flat, the way a narrator waits for a script.",
    '"Reading the text," she says, and lifts her eyebrows, waiting for him to give her some.',
  ],
  lore: ["lore/the-dating-game-echo"],
  reviewedBy: ["story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
