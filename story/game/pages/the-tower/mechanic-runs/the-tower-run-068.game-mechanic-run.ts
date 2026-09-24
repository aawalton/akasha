import type { GameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun068 = {
  id: "01a0c958-d909-7aa1-aa8e-03a0fd722855",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-068",
  title: "EXPERIMENT ANSWERED — YES / EASIER-BUT-BOUNDED / DIFFERENT. The fully-charged ri…",
  game: "story-game/the-tower",
  turn: 63,
  mechanic: "game-mechanic/attribute-check",
  said: "EXPERIMENT ANSWERED — YES / EASIER-BUT-BOUNDED / DIFFERENT. The fully-charged rivet released its bound ember into the hammer-head as working heat (deep fast orange, faster than a brazier) -> a battery can run a forge. EASY on him (rivet pays the heat; Focus barely moved) but the charge EMPTIES — finite, unlike open fire. THE DISCOVERY: hammering with the bound ember sets ember INTO the worked iron -> the head takes a NASCENT ember-bind (forge-bind), a path to ember-bound tools fusing Smithing + Essence Infusion. GAIN: Smithing Novice 1 -> Novice 3 (+2 within-rung). No affinity tick (expenditure). COST: Focus 30->26, Stamina 52->44; HP unchanged. Fire-purged rivet DRAINED into the work (intact; refills). Iron hammer-head forge-bound-in-progress, still hafless. STOP at his decision point. NO assumed next action. NO Tower reset.",
  follows: "ed633cf921c93b9591c900613d19d35c33ce9dfa464313dea6a788dae3a2d471",
  workings: "json",
} as const satisfies GameMechanicRun
