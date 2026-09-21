import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerFloor01 = {
  id: "01a0c661-2352-7ec0-ad9d-e29068283b03",
  type: "page-type/game-location",
  slug: "the-tower-floor-01",
  title: "The Threshold",
  game: "game/the-tower",
  depth: 1,
  theme:
    "A cold stone landing at the tower's base. Damp, lightless but for a faint glow further in. The air tastes of old ash. One iron door, ajar.",
  exits: ["ascending stair (sealed until the floor is cleared)"],
  note: "First fight: winnable for a mind-heavy/physically-weak build. Brute force works but is mediocre; reading the core (intent 7+) ends it fast. Teaches the intent mechanic without a fail-state trap. Stakes are real (Ashling can chunk ~25-30/hit) but Alan out-HPs and out-damages it if he engages the core.",
} as const satisfies GameLocation
