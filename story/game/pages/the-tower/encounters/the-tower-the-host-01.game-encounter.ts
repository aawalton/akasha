import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerTheHost01 = {
  id: "01a0c661-24c1-7f35-8a83-5df9942f1e89",
  type: "page-type/game-encounter",
  slug: "the-tower-the-host-01",
  title: "The Host (Warden of the Haven) — Phase 1, the Weaver",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-05",
  entities: ["game-entity/the-tower-the-host-01"],
  trigger: "raising a weapon to the Host / forcing the false exit (PHASE 1 — the decoy-weaver)",
  drop: "(phase 1 banks no reward on its own — the cracked haven flows directly into phase 2; reward is on the true-form kill)",
} as const satisfies GameEncounter
