import type { GameEntity } from "akasha/story/game/game-entity/game-entity.page-type.types.ts"

export const partnersIiPartnersAlan = {
  id: "01a0c663-1fe1-7739-8b85-9e830162c261",
  type: "page-type/game-entity",
  slug: "partners-ii-partners-alan",
  title: "Alan",
  game: "story-game/partners-ii",
  kind: "player",
  level: 1,
  skills: [
    { name: "Patternwork", progress: 0, effect: "none stated" },
    { name: "Even Keel", progress: 0, effect: "none stated" },
    { name: "Appraisal", progress: 0, effect: "none stated" },
  ],
  revealGate: 1,
  note: "The reader. Capable adult newcomer; OP fantasy compounds through bonds — tension from stakes and choices, never from nerfing him.",
} as const satisfies GameEntity
