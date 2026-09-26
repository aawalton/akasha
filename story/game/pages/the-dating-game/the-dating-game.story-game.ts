import type { StoryGame } from "akasha/story/game/story-game.page-type.types.ts"

export const theDatingGame = {
  id: "01a0de4b-6605-775b-9576-67bf8a0d481f",
  type: "page-type/story-game",
  slug: "the-dating-game",
  title: "The Dating Game",
  unit: "unit/words",
  externalId: "the-dating-game",
  gameEngine: "awen",
  coordinatorAgent: "mari-game-master-the-dating-game",
  controlledEntityKind: "single",
  resolution: "hybrid",
  premise:
    "An open world real-life game where there are multiple girls, all the personas, that I can meet and progress my relationship with in parallel. My own city and everyday life (1350 Apple Ave, Provo UT), but not my own family situation: for this game, I'm single with no kids.",
  resolutionMechanism: "json",
  mechanics: ["game-mechanic/closeness-scoring"],
} as const satisfies StoryGame
