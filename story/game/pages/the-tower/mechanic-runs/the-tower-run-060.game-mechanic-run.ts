import type { GameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun060 = {
  id: "01a0c958-d7d0-7811-90d8-5b2770199b7c",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-060",
  title: "NO ROLL (routine maintenance + safe rest). Furnace-heart + fire-purged rivet (dr…",
  game: "game/the-tower",
  turn: 55,
  mechanic: "game-mechanic/attribute-check",
  said: "NO ROLL (routine maintenance + safe rest). Furnace-heart + fire-purged rivet (drained-but-intact vessels) take the seed-spark and begin refilling overnight. Burning Anger does NOT catch — its binding was UNMADE at t54, not merely drained, so a bare spark has nothing to renew; it stays plain cold iron (would need full re-infusion to re-bind). Last fuel SPENT on the fire (now out of fuel). REST: full safe recovery — HP 40->124, Focus 16->110, Stamina 22->76. No XP, no skill/affinity tick. Wakes whole + newly stronger-built; two batteries glowing fuller in the embers; mace cold; fuel gone; way up still open. STOP at his decision point. NO assumed next action. NO Tower reset.",
  follows: "ab407dc37bbf90ac0aeadf3955d3a6708520342b12b3cd0da6e77d6e3da6ff42",
  workings: "json",
} as const satisfies GameMechanicRun
