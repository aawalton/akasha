import type { GameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun028 = {
  id: "01a0c958-d3a9-7dfe-83d2-193c9824f94b",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-028",
  title: "KILL. Glut 34->dead (46 dmg, roll 19, one off crit). FLOOR 2 SECOND WARDEN CLEAR…",
  game: "game/the-tower",
  turn: 22,
  mechanic: "game-mechanic/attack-resolution",
  said: "KILL. Glut 34->dead (46 dmg, roll 19, one off crit). FLOOR 2 SECOND WARDEN CLEARED -> both wardens down -> far spiral stair UNSEALS -> FLOOR 2 CLEARED. Reward +90 XP + swarm-ichor (drops at edge, uncollected). XP 70+90=160 >= 150 -> LEVEL 3 (carry 10), xpToNext(3)=200 -> 10/200, +3 attr points unspent. Cost of pushing past metered max: Focus 60->10 (-50), HP backlash -6 (over-channel strain) 71->65, Stamina 53->51. Ember Affinity 9 +1 (live heat-strike) -> 10 == PROMOTION to Ember MANIPULATION (tier 2 shape/direct; counter resets to 1, cap 50, bias +1->+2). Ember Burst HELD at 11 (no skill tick this turn — skill-pacing recalibration pending per Alan: each rung must cost more than the last; SKILL advancement PAUSED until the curve is set). UNLOOTED/REACHABLE now (water safe): Sentry pauldron+fire-purged rivet across the water, sunken 2nd iron bar + river-stone, swarm-ichor at edge. NOT auto-looted — his choice next. NO Tower reset (no death).",
  seed: "432216011",
  follows: "f13b06c4463b57c874a754433c7b201f6f56fce76b613b11592a7723d0630492",
  workings: "json",
} as const satisfies GameMechanicRun
