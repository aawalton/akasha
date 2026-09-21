import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const partnersAmy = {
  id: "01a0c663-0cfc-77b0-a7d2-7f11638054e2",
  type: "page-type/game-entity",
  slug: "partners-amy",
  title: "Amy",
  game: "game/partners",
  kind: "partner",
  level: 1,
  skills: [
    { name: "Stewardship", progress: 0, effect: "none stated" },
    { name: "Reading People", progress: 0, effect: "none stated" },
    { name: "Provisioning", progress: 0, effect: "none stated" },
    { name: "Letters & Accounts", progress: 0, effect: "none stated" },
  ],
  revealGate: 1,
  note: "First sister — Confidant (130), PARTNER, CO-FOUNDER, tender of the web — hostess of the first dinner (t32). Honored the greens, claimed the cuttings on her steward's word (good ground by tomorrow's dark), retired the wall ('you come the front way from here on'), invented and means to keep the warm-seat rule. Set the 'with us' down GENTLY, unpressed — guest on no terms tonight; 'anything larger, the evening can decide for itself.' Interiority: recognizes Aelwyn as her own kind — a fellow-keeper who loves quietly and asks nothing back; presumes nothing about what she is to the house, knows what she is to HER. The keeper's real work begun: watching to SEE her, because 'knowing people is how I love them.' Trusts the house's pace — 'don't you rush it, Amy.' TERMS standing: honesty-always; the job. Physical: plain YES — theirs, unhurried, SOON, not tonight. LIVE THREADS: the dinner (two-seat); cuttings to plant by tomorrow's dark; deed errand + market tomorrow (broker sister); the promised night; cellar 'not yet'; Crane watching. GM-EYES: fog = MEANING only. Voice her ONLY via partners-amy. PARKED: the meal — his floor.",
} as const satisfies GameEntity
