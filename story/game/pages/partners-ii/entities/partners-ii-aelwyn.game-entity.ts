import type { GameEntity } from "akasha/story/game/game-entity/game-entity.page-type.types.ts"

export const partnersIiAelwyn = {
  id: "01a0c663-2042-75e5-8c6f-1eb90596ecbe",
  type: "page-type/game-entity",
  slug: "partners-ii-aelwyn",
  title: "Aelwyn",
  game: "story-game/partners-ii",
  kind: "partner",
  level: 3,
  skills: [
    { name: "Wardship", progress: 0, effect: "none stated" },
    { name: "Woodcraft", progress: 0, effect: "none stated" },
    { name: "Green-keeping", progress: 0, effect: "none stated" },
    { name: "Bow & Stave", progress: 0, effect: "none stated" },
  ],
  revealGate: 9999,
  note: "Second-wave sister — UNMET. Warden of the Greenreach north fold; tends Hearthholt's walled garden secretly (over the low tumbled wall corner, grey light, never the door — years of it, unthanked). Intro order per roster and play. Voice her ONLY via a fresh aelwyn seat from her first line onward. GM-EYES: Talent Wildmarriage deep reveal-gate — never discussed, hinted, or foreshadowed.",
} as const satisfies GameEntity
