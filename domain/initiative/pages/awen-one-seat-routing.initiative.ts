import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenOneSeatRouting = {
  id: "01a18cb3-e515-7115-af3b-b5a10dd5ad59",
  type: "page-type/initiative",
  slug: "awen-one-seat-routing",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-single-seat-turn",
  constraints: [
    "No turn is taken in gifted-reborn, which is Alan's real save.",
    "A story stating nothing for the value makes its turns exactly as it does now.",
    "A one-seat turn lands its beats, outcomes, memory, pictures and prose where a seat-graph turn lands them.",
  ],
  createdAt: "2026-10-30T12:06:02.259Z",
  updatedAt: "2026-10-30T12:39:23.486Z",
} as const satisfies Initiative
