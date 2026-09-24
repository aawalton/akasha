import type { GameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun034 = {
  id: "01a0c958-d461-722b-9ebe-27486a1c74a9",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-034",
  title: "RECOVERY (no contest). Safe downtime on a cleared floor + explicit 'until recove…",
  game: "story-game/the-tower",
  turn: 29,
  mechanic: "game-mechanic/attribute-check",
  said: "RECOVERY (no contest). Safe downtime on a cleared floor + explicit 'until recovered' intent -> full Focus restore: 10 -> 110 (max 110). MEDITATION = mental practice, recovers Focus ONLY. HP (65/80) and Stamina (45/56) NOT touched (no physical rest / no food taken — not assuming that intent). No Ember practice this turn -> NO affinity/skill tick; Ember Manipulation counter stays 1 (sidesteps the pending per-point schedule). NO Tower reset.",
  follows: "7ed671e7355e1fa8433ff6b117b0fce3d15ea7224e7e544ba214539cfabd9d1a",
  workings: "json",
} as const satisfies GameMechanicRun
