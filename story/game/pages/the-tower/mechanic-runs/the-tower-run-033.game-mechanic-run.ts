import type { GameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun033 = {
  id: "01a0c958-d444-7e06-8555-0c2ae5e6afa4",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-033",
  title: "ALLOCATION (no contest). 3 unspent points -> 0. INTELLECT 18->19 (Focus max 104-…",
  game: "game/the-tower",
  turn: 28,
  mechanic: "game-mechanic/attribute-check",
  said: "ALLOCATION (no contest). 3 unspent points -> 0. INTELLECT 18->19 (Focus max 104->108), PERCEPTION 11->12 (Initiative 25->26, newly revealed), WILL 16->17 (Focus max 108->110). Net: Focus max 104->110 (+6); Initiative 25->26 (+1); Initiative now shown on the sheet for the first time. CURRENT Focus unchanged (10 — no auto-heal). VITALITY held at 7 by his choice. Engine-verified via derive(): focusMax 110, initiative 26. NO Tower reset.",
  follows: "c65c04c670705ce454b89ffadf8f8efa9f6a1b257eab457cbe034a1b23b6b113",
  workings: "json",
} as const satisfies GameMechanicRun
