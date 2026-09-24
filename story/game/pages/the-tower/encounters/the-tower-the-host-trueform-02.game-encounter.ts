import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerTheHostTrueform02 = {
  id: "01a0c664-9446-7bef-9a20-0964ff4eff1d",
  type: "page-type/game-encounter",
  slug: "the-tower-the-host-trueform-02",
  title: "The Host — Phase 2, True Form",
  game: "game/the-tower",
  location: "place/the-tower-floor-05",
  characters: ["character-other/the-tower-the-host-trueform-02"],
  readableTrait:
    "The thing under all the faces — fast and lean, 130 HP, the gracious mask gone (PRESENCE crashes to 8; FINESSE 17 / PERCEPTION 16 / Init 33 — it acts BEFORE Alan now). This is the DIFFICULTY RAMP: phase 1 was a read, phase 2 is a real, lethal fight. It hits for ~94 of Alan's 124 HP per clean connect, so TWO connects kill him and it strikes first — he cannot trade slowly. GATE is LIGHT-DISCIPLINE (a floor-4 callback, compounded): the haven is dead so there's no decoy game, but the predator tries to slip into the failing shadows to re-cloak and reset. Pinned in Alan's EMBER-LIGHT it is fully real and exposed — coordinator ×1.5 (~126/hit, ~2 clean hits drop it); if it reaches shadow it flickers half-real — coordinator ×0.5 (~42/hit) and re-hides for a beat (resetting toward another ambush). The line: keep it LIT (Burning Anger's banked core, an Ember flare, a thrown brand), corner it against real stone, and finish in two before it lands two. Aelwyn, if present, fronts it (her HP/physDef soak the ~94 blows so Alan can place the killing strikes from light) — but solo is winnable by light-discipline + his glass-cannon output.",
  trigger:
    "a confirmed true-Host strike cracks the haven (PHASE 2 — the predator under the faces; flows straight from the-host-01)",
  drop: "the haven's ANCHOR (a 'lantern of true seeing' / revelation-core — a cold clear lens that, lit with his Ember, shows woven illusion for what it is; a strong forward counter-tool for future deception floors + a true-sight affinity seed) and the Host's mantle (the woven-light cloak — glamour-craft material / a PRESENCE-keyed deception-affinity seed)",
  gates: [
    {
      name: "pinned in the ember-light",
      multiplier: 1.5,
      note: "Lit and cornered against real stone it is fully real and exposed, and two clean strikes drop it.",
    },
    {
      name: "slipped into the failing shadows",
      multiplier: 0.5,
      note: "In shadow it flickers half-real, re-hides for a beat and resets toward another ambush.",
    },
  ],
} as const satisfies GameEncounter
