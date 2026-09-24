import type { GameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun058 = {
  id: "01a0c958-d78a-7aef-838a-2523236ffd08",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-058",
  title: "RESTED — full recovery (HP/Focus/Stamina to max; t45 burns healed). CORE READ FU…",
  game: "story-game/the-tower",
  turn: 53,
  mechanic: "game-mechanic/attribute-check",
  said: "RESTED — full recovery (HP/Focus/Stamina to max; t45 burns healed). CORE READ FUMBLED — he could not confirm the Furnace-heart's limit and leans (wrongly) toward 'still filling'; GROUND TRUTH is that it is already at its cap (internal only — fog of war holds). No XP, no expenditure, no affinity tick. Fully restored, uncertain about the core, the way up still open and unclimbed. STOP at his decision point. NO assumed next action. NO Tower reset.",
  follows: "fb7b4259ba7277555430fa8eb3351a29626aed6f9627d2077c1912bd17761898",
  workings: "json",
} as const satisfies GameMechanicRun
