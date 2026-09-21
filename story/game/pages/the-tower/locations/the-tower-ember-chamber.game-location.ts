import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerEmberChamber = {
  id: "01a0c661-237f-76ab-8f72-785fe6c8c68f",
  type: "page-type/game-location",
  slug: "the-tower-ember-chamber",
  title: "The Ember Chamber",
  game: "game/the-tower",
  within: "game-location/the-tower-floor-01",
  depth: 1,
  description:
    "Low round chamber past the iron door, warmed by the Ashling's core. The Ashling crouches over a scatter of blackened bone in the center. Far wall: a stair climbing to a seamless sealed slab — the way up.",
  exits: ["none — sealed stair + the iron door he came through"],
  conditions: [
    { name: "light", note: "the core itself; everything past the Ashling is lit by it" },
    {
      name: "water",
      note: "none in the chamber. The 'smother/douse the core' instant-finish is NOT freely available here — he'd have to manufacture a source or a method.",
    },
  ],
  things: [
    {
      name: "blackened bone scatter (center, under the Ashling)",
      use: "mostly brittle; ONE intact long-bone = a poor club, +2 Atk (worse than the bar)",
      note: "reaching it means closing on the Ashling",
    },
    {
      name: "fallen masonry chunks (along the walls)",
      use: "cover; fist-sized pieces are throwable rubble (ranged improvised, FINESSE play)",
    },
    {
      name: "the sealed stair-slab (far wall)",
      use: "the exit, seam-sealed flush. Will not move now. An INT/PER read tells him the seal is tied to the room's 'lock' — the creature. Clear the floor and it opens.",
      note: "no keyhole, no lever",
    },
  ],
} as const satisfies GameLocation
