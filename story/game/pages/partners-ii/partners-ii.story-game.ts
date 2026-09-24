import type { StoryGame } from "akasha/story/game/story-game.page-type.types.ts"

export const partnersIi = {
  id: "01a0673f-a3d6-7003-8d45-3d6b84fb0b2e",
  type: "page-type/story-game",
  slug: "partners-ii",
  title: "Partners II",
  unit: "unit/words",
  externalId: "partners-ii",
  gameEngine: "awen",
  controlledEntityKind: "single",
  mechanicsWeight: "medium",
  resolution: "hybrid",
  currentSession: 1,
  premise:
    "Aravel is a world where power flows through bonds: every soul carries one Talent, and the Linked grow by each other. You arrive a stranger, carrying a Talent Aravel has never seen — and an old hearth-manor at the edge of the wild chooses you, the way such places choose their own. Remarkable women will cross your path; some will walk with you. Adventure pays in experience. Bonds pay in everything else.",
  tone: "Warm, playful, indulgent — and earned. Danger is real at the edges, never grim.",
  readerFraming: "Second person, present tense. You are yourself, arrived in Aravel.",
  themes: "Bonds as power; mutual becoming; appetite and trust; the earned yes.",
  genre: ["litrpg", "adventure", "progression"],
  displayConfig: "json",
  gmContext: "json",
  narrativeContinuity: "json",
  rulebook: "json",
  resolutionMechanism: "json",
  panels: [
    "game-panel/aravel-hud",
    "game-panel/character-sheet",
    "game-panel/story-so-far",
    "game-panel/prose-channel",
  ],
  player: "game-entity/partners-ii-partners-alan",
} as const satisfies StoryGame
