import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerTheHost01 = {
  id: "01a0c662-cddb-78c1-aff5-72462227604b",
  type: "page-type/game-encounter",
  slug: "the-tower-the-host-01",
  title: "The Host (Warden of the Haven) — Phase 1, the Weaver",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-05",
  entities: ["game-entity/the-tower-the-host-01"],
  trigger: "raising a weapon to the Host / forcing the false exit (PHASE 1 — the decoy-weaver)",
  drop: "(phase 1 banks no reward on its own — the cracked haven flows directly into phase 2; reward is on the true-form kill)",
} as const satisfies GameEncounter
