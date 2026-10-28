import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenStatsSections = {
  id: "01a1846f-674d-7d1d-9f5a-b62bb54a1c3d",
  type: "page-type/initiative",
  slug: "awen-stats-sections",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "The stats display uses the same component as Temper Completion uses." },
    { statement: "The stats sections are collapsible sections." },
    {
      statement: "The spacing between a heading and its first item is the spacing between items.",
    },
  ],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-28T21:34:15.884Z",
  updatedAt: "2026-10-28T21:34:15.884Z",
} as const satisfies Initiative
