import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerFloor02 = {
  id: "01a0c65d-1ccf-7dc4-ab46-f42cb6c267e7",
  type: "page-type/game-location",
  slug: "the-tower-floor-02",
  title: "The Cistern",
  game: "game/the-tower",
  depth: 2,
  theme:
    "The stair climbs into a vast flooded hall — water held impossibly high in the Tower, by no logic but the System's. Black water laps at a ring of broken walkway. The air is wet, mineral, cold enough to fog breath. Drips echo from a dark too big to see across. Somewhere ahead, the slow drag of something heavy through water. The way on is a corroded spiral stair on the far side, behind the water. (Continuity: reached by ASCENDING from floor 1 — the slab Alan was shown sliding back opens onto these climbing steps. Do not narrate a descent.)",
  exits: ["ascending spiral stair, far side (sealed until the floor is cleared)"],
  note: "FLOOR 2 — the water floor; introduces environmental exploitation and a damage-GATE model. KEY DESIGN NOTE FOR THE COORDINATOR: Alan's physAtk (33.5 with the bar) overwhelms raw enemy physDef, so margins balloon and brute force would trivialize any enemy on stats alone — the floor-01 intent bonus alone is NOT enough to make 'reading the weakness' load-bearing. The fix used here: each readableTrait carries an explicit DAMAGE GATE (a multiplier the coordinator applies based on whether the player engaged the weakness) — x0.4 to the Sentry's armored front, x0.3 to the Glut in water, vs x1.5–x2 when read correctly. The math then enforces the design intent: brute force is a slog (mitigated to a chip), reading wins fast. Apply the gate as a baseDamage multiplier BEFORE the engine's margin scaling. Stakes are real: the Sentry hits ~28+ (chunks Alan's 70 HP hard), and the Glut's drowning grapple is a true kill threat to VIT 6 — Alan MUST control geography (stay dry, strand the swarm, get behind the Sentry). The brazier is the linchpin item: heat cracks the Sentry and herds the Glut; lighting it is the floor's 'aha.' Two enemies but they need NOT be fought together — a smart reader separates them (the Sentry is slow, the Glut is water-bound). Reward gives Alan his first armor (physDef 9.5 → ~11.5) and two affinity seeds, modest power-up before floor 3. LOOP NOTE (coordinator-only): layout is fixed and reproducible — a re-climb matches this exactly, by design.",
} as const satisfies GameLocation
