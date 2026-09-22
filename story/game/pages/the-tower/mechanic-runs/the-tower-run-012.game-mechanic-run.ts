import type { GameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun012 = {
  id: "01a0c958-d16b-7abe-b4d6-3c77cd97a9e8",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-012",
  title: "SOLID READ despite low die (INT floor carries it). REVEALED: (1) Drowned Sentry…",
  game: "game/the-tower",
  turn: 11,
  mechanic: "game-mechanic/attribute-check",
  said: "SOLID READ despite low die (INT floor carries it). REVEALED: (1) Drowned Sentry burned out over the rest interval — DEAD; husk collapsed half in shallows; drops (pauldron=first armor, fire-purged rivet=heat seed) on it, UNLOOTED. (2) Water re-occupied — the Glut sank back to the deep during his absence and RECOVERED (~72/74, back to full lethality); he reads the almost-still-but-wrong surface. (3) Far spiral stair: ONE of two seam-locks released by the Sentry's death; deduces both wardens gate the exit. Did NOT get bonus detail (submerged 2nd iron bar + river-stone under platform — needs closer/underwater search). DRIFT RULING (no death=no reset; time passed during rest): Sentry's fire finished it off-screen; Glut recovered. KILL+LEVEL: Sentry kill registers now +110 XP. 60+110=170 -> LEVEL 2 (70/150). LEVELING RULING (recorded standing): xpToNext(L)=100+(L-1)*50; +3 attribute points/level (player-allocated); maxes DERIVE from attributes (no per-level bump); level-up does NOT auto-heal (HP stays 62/70). attributePointsUnspent=3.",
  seed: "526731715",
  follows: "b778841cd8767a446038920d06a27683707d62b5bc8676a3554f169ce2ef9623",
  workings: "json",
} as const satisfies GameMechanicRun
