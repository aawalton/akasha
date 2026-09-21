import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerTheWelcomersPair01 = {
  id: "01a0c661-2490-752f-ad91-d7f43353867e",
  type: "page-type/game-encounter",
  slug: "the-tower-the-welcomers-pair-01",
  title: "The Welcomers (coordinated pair — run TWO instances of this sheet)",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-05",
  entities: ["game-entity/the-tower-the-welcomers-pair-01"],
  trigger: "entering the Long Gallery / engaging either of the two figures (they act together)",
  drop: "two false-face shards (a matched pair — a glamour-craft seed toward casting a borrowed face of his own) and a silvered gallery-shard (a true-reflection lens — a verification tool he can carry forward against illusion)",
} as const satisfies GameEncounter
