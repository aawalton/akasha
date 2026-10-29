import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenStatsOnePanel = {
  id: "01a187fe-3841-78f1-81ce-f367af3c5a54",
  type: "page-type/initiative",
  slug: "awen-stats-one-panel",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [{ statement: "The stats display is a single panel holding collapsible sections." }],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-29T14:09:07.136Z",
  updatedAt: "2026-10-29T14:09:07.136Z",
} as const satisfies Initiative
