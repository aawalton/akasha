import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerTheWelcomer01 = {
  id: "01a0c65d-203b-7e30-a958-6d97b3141b65",
  type: "page-type/game-encounter",
  slug: "the-tower-the-welcomer-01",
  title: "The Welcomer",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-05",
  entities: ["game-entity/the-tower-the-welcomer-01"],
  trigger:
    "accepting the Welcomer's aid/rest in the Hall of Welcome, OR moving deeper, OR revealing/striking it",
  drop: "a false-face shard (glamour/illusion-affinity seed — woven light holding a borrowed face) and its true hide (thin, cold, light-drinking like the Stalker's lens — crafting material toward a concealing garment)",
} as const satisfies GameEncounter
