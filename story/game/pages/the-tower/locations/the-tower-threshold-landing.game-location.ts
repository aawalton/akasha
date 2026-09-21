import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerThresholdLanding = {
  id: "01a0c661-2369-7ffb-b3f0-6cc4c15ff2d7",
  type: "page-type/game-location",
  slug: "the-tower-threshold-landing",
  title: "The Landing (wake point)",
  game: "game/the-tower",
  within: "game-location/the-tower-floor-01",
  depth: 1,
  description:
    "The cold, near-lightless room Alan woke in. Old ash and grit underfoot, faintly damp stone, the great vertical dark of the shaft above. One iron door, ajar, to the chamber.",
  exits: ["none — only the iron door to the chamber"],
  conditions: [
    {
      name: "water",
      note: "stone is damp from seep/condensation — NOT pooled. Not enough to douse anything. No standing water on this floor.",
    },
  ],
  things: [
    {
      name: "rusted iron bar",
      use: "improvised weapon, +4 Atk",
      note: "the one genuinely useful find here — the search prize",
      status: "TAKEN (turn 1, +3 search)",
    },
    {
      name: "charcoaled timber / fallen beam",
      use: "none — crumbles to charcoal at a touch",
      note: "where the bar was wedged",
    },
    {
      name: "brittle bowl fragment",
      use: "none — shatters",
      note: "hints the landing was once inhabited",
    },
    {
      name: "drifted grey ash + grit",
      use: "throwable handful (eye/distraction, low intent unless aimed cleverly)",
    },
  ],
} as const satisfies GameLocation
