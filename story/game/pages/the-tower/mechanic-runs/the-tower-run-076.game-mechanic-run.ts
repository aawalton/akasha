import type { GameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun076 = {
  id: "01a0c958-da2a-7294-abe0-a85a6f2ed66e",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-076",
  title: "ALLOCATION COMMITTED — WILL 17 -> 20 (+3). Supersedes the held-points t70 record…",
  game: "game/the-tower",
  turn: 70,
  mechanic: "game-mechanic/attribute-check",
  said: "ALLOCATION COMMITTED — WILL 17 -> 20 (+3). Supersedes the held-points t70 record (invalid 'Wisdom' target). Engine-derived: focusMax 114 -> 120 (+6, INT*4+WILL*2; +2/WILL — the only displayed pool to move); current focus 89 -> 95 (rises with the max, t61 precedent); mentDef 35.5 -> 40 (WILL*1.5+INT*0.5, internal). hpMax 124 / stamMax 76 / initiative 26 UNCHANGED (no WILL term). attrPoints 3 -> 0. WILL attrInfo already revealed. Narrated as resolve HARDENING against the foreign comfort-pull (NOT the illusion dispelled — he was never entranced; he read it at the scout). Scene UNCHANGED — still on the threshold, NOT stepped in; illusion does not react; no assume of his next move. NO Tower reset.",
  follows: "f57a1cab9bf1324427ed92fdba6397efaa75e0f51b5ed43bab89e7f66642bcd4",
  workings: "json",
} as const satisfies GameMechanicRun
