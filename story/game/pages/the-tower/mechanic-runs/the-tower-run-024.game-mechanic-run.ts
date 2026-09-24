import type { GameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun024 = {
  id: "01a0c958-d310-7f92-b196-0bcf119f9c9b",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-024",
  title: "The Glut, balked at the waterline at ~42 HP, sank back to the deep and RE-POOLED…",
  game: "story-game/the-tower",
  turn: 18,
  mechanic: "game-mechanic/attribute-check",
  said: "The Glut, balked at the waterline at ~42 HP, sank back to the deep and RE-POOLED / recovered in its restorative water toward ~70/74 (per DRIFT RULING, as during the turn-10 rest). Net: his turns 16-17 chip is undone by resting — the Glut can't be ground down across rest cycles; it must be killed in one committed go via the strand-on-dry-stone play he deduced (turn 15). He re-reads the recovered water on return (fog: diegetic, not told).",
  follows: "1c131dbe9f3864c9341370715181f4fe85ed981b84894d3baab878f42e0bc3a0",
  workings: "json",
} as const satisfies GameMechanicRun
