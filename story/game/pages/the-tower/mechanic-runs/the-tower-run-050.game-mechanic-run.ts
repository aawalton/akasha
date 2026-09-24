import type { GameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun050 = {
  id: "01a0c958-d67f-762e-8a14-c1800019e325",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-050",
  title: "PARTIAL FORGE — real but ragged. ALLOCATION (not the roll): +3 points -> VITALIT…",
  game: "story-game/the-tower",
  turn: 45,
  mechanic: "game-mechanic/attribute-check",
  said: "PARTIAL FORGE — real but ragged. ALLOCATION (not the roll): +3 points -> VITALITY 7->10; frame widened FIRST -> maxHP 80->104, stamMax 56->68. FORGE GAIN (the roll): a little real strength set into muscle and bone -> MIGHT 12->13 (+2 more maxHP -> hpMax 106). SKILL: a hard, substantial use under extreme load, but ragged execution -> Ember-Tempered Body WITHIN-RUNG roll-up Novice 1 -> Novice 3 (NO promotion; the skill's own demand — 'do it cleaner' — unmet). ABSORPTION: reaching out and pulling Burning Anger's whole Ember-charge is one discrete substantial absorption -> Ember Manipulation 6 -> 7 (+1). COST / SELF-HARM: much of the feast could not set and burned through him -> HP 34 -> 20 (-14, heavy); the massive channel Focus 54 -> 28 (-26); bodily forge-strain Stamina 37 -> 24 (-13). ITEM COST: Burning Anger drained to a DEAD plain rusted bar (Ember-charge / conduit role gone), lying at the stair-lip, uncollected. RESOURCE: the held guardian's-worth of ember is now SPENT (poured into flesh) — he is no longer a walking bomb. STATE: unarmed (Cold Revenge at his feet, drained Burning Anger at the lip), badly burned at ~1/5 HP, permanently tougher-framed, the way up open past the dead hulk. STOP at his decision point. NO assumed next action. NO Tower reset.",
  follows: "10e23d6fa392747e807a37865ba4dfeed052921eb20e9a587719121130fc3225",
  workings: "json",
} as const satisfies GameMechanicRun
