import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00032 = {
  id: "01a0e56e-65e9-718d-b709-e594b2990d4f",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-032",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 32,
  turnStatus: "turn-status/writer",
  action:
    "I chuckle softly. “Thanks, I’ll gladly take you up on that. So, what brings you here? It sounds like you do this often?”",
  beats: [
    'Alan chuckles softly. "Thanks, I\'ll gladly take you up on that."',
    'He falls in beside her down the row. "So, what brings you here? It sounds like you do this often?"',
    '"Most evenings," Grace says. "Around this hour."',
    "She walks a few steps in silence, the lantern light sliding over the names on the stones.",
    '"I work nights. Hospice. I\'m a companion; I sit with people at the end, through the night."',
    "She says it simply, the way someone else might say they drive a bus.",
    '"This walk is how I get ready. It\'s quiet here, and a lantern fits right in."',
    "The lantern swings low between them, and the gravel of the path crunches softly under their feet.",
  ],
  lore: ["lore/the-dating-game-grace"],
} as const satisfies StoryTurnPlayed
