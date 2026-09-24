import type { GameEntity } from "akasha/story/game/game-entity/game-entity.page-type.types.ts"

export const partnersPartnersAlan = {
  id: "01a0c663-0ce2-7a9b-aea7-26de69c8c3b7",
  type: "page-type/game-entity",
  slug: "partners-partners-alan",
  title: "Alan",
  game: "story-game/partners",
  kind: "player",
  level: 2,
  skills: [
    { name: "Patternwork", progress: 0, effect: "none stated" },
    { name: "Even Keel", progress: 0, effect: "none stated" },
    { name: "Appraisal", progress: 0, effect: "none stated" },
  ],
  titles: [{ name: "Talent: The Link", effect: "none stated" }],
  revealGate: 1,
  note: "The reader / experimenter, heart plain under the lab coat. L2, xp 155 — ATTRIBUTE INCREASE STILL PENDING (his choice of one attribute). Talent THE LINK — forms at the Linked bond-stage (300 + mutual yes). Day 2, evening (t32): welcomed Aelwyn in — 'be at home here, with us' — taken kindly and carefully; Amy hosted (greens honored, cuttings promised to ground, wall retired, warm seat, the unpressed us, the toast to the three of them). Aelwyn spent the watched-nights story: she saw the house take light window by window two nights ago. PARKED ACTION: the meal is begun, the table his — respond to her story, carry the dinner. Threads: deed errand + market tomorrow; the promised night (soon); cellar 'not yet'; Crane watching.",
} as const satisfies GameEntity
