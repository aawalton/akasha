import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenSingleSeatTurn = {
  id: "01a18cae-feda-7c0a-83f8-2140719a1055",
  type: "page-type/initiative",
  slug: "awen-single-seat-turn",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  constraints: [
    "This initiative only coordinates, and subagents under its sub-initiatives do every implementation.",
    "No turn is taken in gifted-reborn, which is Alan's real save; a clone played by agents tests it.",
    "Gifted: Reborn is switched only after a clone turn without pictures reaches player and its memory item lands.",
    "Alan's turn still shows its beats, outcome cards and prose as a seat-graph turn shows them.",
    "Alan has approved every directive this initiative needs to land.",
  ],
  createdAt: "2026-10-30T12:00:41.177Z",
  updatedAt: "2026-10-30T18:04:17.039Z",
} as const satisfies Initiative
