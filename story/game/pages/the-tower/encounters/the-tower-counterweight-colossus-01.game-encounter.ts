import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerCounterweightColossus01 = {
  id: "01a0c661-232b-788a-9e12-d73df6433787",
  type: "page-type/game-encounter",
  slug: "the-tower-counterweight-colossus-01",
  title: "Counterweight Colossus (the Warden)",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-04",
  entities: ["game-entity/the-tower-counterweight-colossus-01"],
  trigger: "approaching the exit-stair / the headworks gantry, or striking the seated Colossus",
  experience: 240,
  drop: "the released winding-drum core (a dense tension-wound iron drum — the heaviest mechanism-core yet; equipment/crafting seed, a 'stored-force' affinity seed) and the Warden's chain-length (a usable heavy flail/tether, atk 5, OR crafting material — Alan likely crafts rather than wields it)",
} as const satisfies GameEncounter
