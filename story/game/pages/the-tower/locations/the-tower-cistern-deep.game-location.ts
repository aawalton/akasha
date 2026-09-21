import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerCisternDeep = {
  id: "01a0c65d-1d3a-75d1-910e-653d3cb0a193",
  type: "page-type/game-location",
  slug: "the-tower-cistern-deep",
  title: "The Deep Water",
  game: "game/the-tower",
  within: "game-location/the-tower-floor-02",
  depth: 2,
  description:
    "Where the walkway gives out, the flood opens into the heart of the undercroft. The Drowned Sentry stands waist-deep on a submerged platform, barring the path to the spiral stair. The water here is full of slow movement — the Glut, a pooled mass of leech-things, drifts just under the surface, drawn to warmth and disturbance.",
  exits: ["back along the walkway; the sealed spiral stair forward"],
  conditions: [
    {
      name: "light",
      note: "the brazier (if lit and carried/placed) is the only bright light; otherwise dim phosphor-silhouette",
    },
    {
      name: "water",
      note: "the deep continues here, three sides of the platform. The Glut lives in it. Dragging an enemy INTO the water, or staying OUT of it, is the tactical axis of this room.",
    },
  ],
  things: [
    {
      name: "the submerged platform (Sentry's footing)",
      use: "knee-to-waist-deep stone shelf; the only stable place to fight near the Sentry. Stepping onto it puts you in the Glut's reach.",
      note: "the fight geography — dry-ish footing surrounded by deep water on three sides",
    },
    {
      name: "the corroded spiral stair (far side)",
      use: "the exit. Seam-sealed flush like floor 1's slab. An INT/PER read: the seal is keyed to the floor's wardens — clear both and it opens.",
      note: "no lever; clearing the encounter is the key",
    },
    {
      name: "sunken debris (under the platform)",
      use: "groping underwater finds a second iron bar (atk 4, equal to Alan's, a spare/offhand) and a smooth river-stone (good thrown, FIN)",
      note: "retrieving means submerging in the Glut's water — a real risk for VIT 6; gate it behind a smart approach",
    },
  ],
} as const satisfies GameLocation
