import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerPlinthGolem01 = {
  id: "01a0c661-2279-7eb4-8b75-d84290fc5cf8",
  type: "page-type/game-encounter",
  slug: "the-tower-plinth-golem-01",
  title: "Plinth Golem (the Warden)",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-03",
  entities: ["game-entity/the-tower-plinth-golem-01"],
  trigger: "approaching the archway / the dais, or striking the seated Golem",
  experience: 220,
  drop: "the cracked keystone (a dense rune-cut block — equipment/crafting seed, the heaviest 'core' yet) and the Warden's stone gauntlet (armor def 3, OR a heavy improvised fist-weapon atk 7 for a MIGHT build — Alan likely sells/crafts it)",
} as const satisfies GameEncounter
