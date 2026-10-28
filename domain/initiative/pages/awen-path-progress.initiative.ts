import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenPathProgress = {
  id: "01a182c9-7933-7500-9827-d8dcb1770672",
  type: "page-type/initiative",
  slug: "awen-path-progress",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "How fast a Gifted Path gains steps matches the pace the Gifted source shows." },
    { statement: "Steps a Gifted Path earns outside practice follow rules the source supports." },
  ],
  createdAt: "2026-10-28T13:53:24.275Z",
  updatedAt: "2026-10-28T13:53:24.275Z",
} as const satisfies Initiative
