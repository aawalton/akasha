import type { GameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun011 = {
  id: "01a0c958-d145-7ca8-8790-dac5ea4756cd",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-011",
  title: "DEEP RECOVERY. Stopped Ember Channel (sustain drain ends). Safe-room rest restor…",
  game: "story-game/the-tower",
  turn: 10,
  mechanic: "game-mechanic/attribute-check",
  said: "DEEP RECOVERY. Stopped Ember Channel (sustain drain ends). Safe-room rest restores renewable pools: Stamina 34->50 (full), Focus 44->104 (full). HP 58->62 (+4) only — ember-absorption BURN is sticky; short rest barely touches real injury (lethality stays real). State-Gated Presence: deliberate down-regulation restores REGULATED state -> full PRESENCE access (was Safety-low post-combat). Reflection = in-character capstone, no mechanical reveal. RULING (recorded standing): rest recovers Stamina+Focus roll-scaled, HP sticky; playing State-Gated Presence restores regulated state. Floor-2 persists off-screen (no death=no reset): Sentry ~6HP burning, Glut ~60HP — drift resolved on return.",
  seed: "448321212",
  follows: "600978efc10e04f6503abcbf4c2c1b6e20d3540e17180ddf833990d85a1e581b",
  workings: "json",
} as const satisfies GameMechanicRun
