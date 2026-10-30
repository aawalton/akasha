import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenCloneRemoveSeatPages = {
  id: "01a18dff-1a43-712b-9e32-fdb056a05a62",
  type: "page-type/initiative",
  slug: "awen-clone-remove-seat-pages",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-one-seat-polish",
  constraints: [
    "No turn is taken, no message sent and nothing advanced in gifted-reborn, which is Alan's real save.",
    "A seat page is taken only where it is a removed clone's own, and is read before it is taken.",
  ],
  createdAt: "2026-10-30T18:07:48.290Z",
  updatedAt: "2026-10-30T18:07:48.290Z",
} as const satisfies Initiative
