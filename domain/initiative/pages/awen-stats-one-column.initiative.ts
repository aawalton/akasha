import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenStatsOneColumn = {
  id: "01a1844b-f937-7b35-a701-e5dc47dd48ce",
  type: "page-type/initiative",
  slug: "awen-stats-one-column",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "The Stats panel is a single column instead of two columns for attributes." },
  ],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-28T20:55:33.942Z",
  updatedAt: "2026-10-28T20:55:33.942Z",
} as const satisfies Initiative
