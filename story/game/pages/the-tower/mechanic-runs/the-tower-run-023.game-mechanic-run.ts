import type { GameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun023 = {
  id: "01a0c958-d2f2-7fd5-9554-1ce29ac229e1",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-023",
  title: "DEEP RECOVERY (nap > short rest). Renewable pools full: Stamina 46->56, Focus 12…",
  game: "story-game/the-tower",
  turn: 18,
  mechanic: "game-mechanic/attribute-check",
  said: "DEEP RECOVERY (nap > short rest). Renewable pools full: Stamina 46->56, Focus 12->104. HP 34->71 (heal 37, roll-scaled) — a nap heals ordinary injury (leech-drain + scald) well, but caps ~75: the deep ember-absorption ache (floor-1 forced draw) is STICKY, untouched by rest, leaving HP short of max. State-Gated Presence: deliberate down-regulation -> regulated -> full PRESENCE access restored (was Safety-low post near-death). No system panel (rest = in-character, no mechanical reveal).",
  seed: "57432619",
  follows: "d2970299fd68435900b497e5acce3031314c0061f5b4951ea960981ed030e03f",
  workings: "json",
} as const satisfies GameMechanicRun
