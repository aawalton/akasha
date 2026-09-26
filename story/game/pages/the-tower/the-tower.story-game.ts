import type { StoryGame } from "akasha/story/game/story-game.page-type.types.ts"

export const theTower = {
  id: "01a0673f-a3d7-7000-afc1-88181be588cb",
  type: "page-type/story-game",
  slug: "the-tower",
  title: "The Tower",
  unit: "unit/words",
  externalId: "the-tower",
  gameEngine: "awen",
  coordinatorAgent: "iris-game-master-the-tower",
  controlledEntityKind: "single",
  mechanicsWeight: "heavy",
  resolution: "formula",
  genre: ["litrpg"],
  chapterBreak: "A new floor begins.",
  cardVocabulary: ["LEVEL UP", "SKILL", "AFFINITY", "TITLE", "ESSENCE ABSORBED"],
} as const satisfies StoryGame
