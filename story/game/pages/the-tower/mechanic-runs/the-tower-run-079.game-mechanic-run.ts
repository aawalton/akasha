import type { GameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun079 = {
  id: "01a0c958-da91-7714-8b1b-0cdd0fd48529",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-079",
  title: "WINDING-DRUM READ (1d20 seed 728194503 -> 5, no crit/fumble; INT 20 + intent 4 +…",
  game: "game/the-tower",
  turn: 73,
  mechanic: "game-mechanic/attribute-check",
  said: "WINDING-DRUM READ (1d20 seed 728194503 -> 5, no crit/fumble; INT 20 + intent 4 + roll 5 vs DC 18 = score 29, margin 11 = WEAK). OUT-OF-BAND read: Ember sense (heat/warmth) reads the iron + residual heat IN-band clearly; Stored-Force's sense (load/tension) is a band he has ZERO affinity for, so the stored force itself is murky/INT-inferred. Poor die failed to carry INT 20 past the sense-gap -> WEAK. GRANTED (weak/in-band): sound dense iron, best crafting stock yet, heat reads true; the stored force is REAL (the hum) but his sense SLIDES OFF it; ruled NOT ember and NOT cold (doesn't fight/bleed like cold) = FOREIGN, and he knows he can't read it with what he has. WITHHELD (mid/strong+): the axis NAME (Stored-Force/Tension), the housable-kinetic-battery plan-seed, the second-affinity path. GROUND TRUTH (locked design, for my notes): orthogonal kinetic axis, NOT infusible into his ember-only flesh, BINDABLE as a crude ember-housed kinetic battery (future), backlash = stamina + recoil-stagger. BOUNDARY: a READ does NOT grant the affinity — Stored-Force ticks 0->1 only on first DRAW/BIND. NO affinity/skill/XP grant. Cost: focus 89->85 (-4, straining a sense past its band + hard INT); hp/stamina unchanged. Core NOT consumed; note updated with learned-partial understanding (no axis name). Ends on the situation; no assume of his next move. NO Tower reset.",
  seed: "728194503",
  follows: "362151a08d976c406bc583afc584b9aec1ac83c2ca44ab4694b12d08aae4a97e",
  workings: "json",
} as const satisfies GameMechanicRun
