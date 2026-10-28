import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenStatsSections = {
  id: "01a18498-2fd5-70c2-8923-48bd908a9386",
  type: "page-type/initiative",
  slug: "awen-stats-sections",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [{ statement: "Every card on the Stats tab sits on one surface level." }],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-28T22:18:48.660Z",
  updatedAt: "2026-10-28T22:18:48.660Z",
} as const satisfies Initiative
