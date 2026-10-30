import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenOneSeatFlow = {
  id: "01a18d37-c988-75f9-b991-29319a604613",
  type: "page-type/initiative",
  slug: "awen-one-seat-flow",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-single-seat-turn",
  constraints: [
    "A seat-graph story makes its turns exactly as it does now.",
    "No turn is taken in gifted-reborn, which is Alan's real save.",
  ],
  createdAt: "2026-10-30T14:30:05.959Z",
  updatedAt: "2026-10-30T16:01:35.063Z",
} as const satisfies Initiative
