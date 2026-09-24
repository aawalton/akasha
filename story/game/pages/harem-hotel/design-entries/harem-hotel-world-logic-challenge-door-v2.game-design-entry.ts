import type { GameDesignEntry } from "akasha/story/game/game-design-entry/game-design-entry.page-type.types.ts"

export const haremHotelWorldLogicChallengeDoorV2 = {
  id: "01a0c946-5be2-7fad-9b8f-cd70694f4990",
  type: "page-type/game-design-entry",
  slug: "harem-hotel-world-logic-challenge-door-v2",
  title: "Challenge Door",
  game: "story-game/harem-hotel",
  kind: "world-logic",
  source:
    "PUBLISHED CANON WINS: published t13 (the far challenge-end door 'gives inward without a sound' when Alan and Aria shove it — it opens to FORCE, a threshold not a lock) + t17 (Alan reframes and Aria agrees: 'A door you shove is only a door. A door that makes you earn the far side of it is a lock' — the WARDEN, not the physical door, is the epistemic gate) + GM/Alan in-fiction canon 2026-07-13.",
  supersedes: "game-design-entry/harem-hotel-world-logic-challenge-door",
  note: "md",
} as const satisfies GameDesignEntry
