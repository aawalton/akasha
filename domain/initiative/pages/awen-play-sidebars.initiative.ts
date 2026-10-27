import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenPlaySidebars = {
  id: "01a17e9d-4b8e-70d5-994a-b1b6cf83a45b",
  type: "page-type/initiative",
  slug: "awen-play-sidebars",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [],
  constraints: ["Nothing inside a panel changes but the place that panel is drawn in."],
  createdAt: "2026-10-27T18:26:40.142Z",
  updatedAt: "2026-10-27T18:51:16.656Z",
} as const satisfies Initiative
