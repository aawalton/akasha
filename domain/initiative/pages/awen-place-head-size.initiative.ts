import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenPlaceHeadSize = {
  id: "01a1841a-bdc3-7e18-8037-6f0b77a4e94a",
  type: "page-type/initiative",
  slug: "awen-place-head-size",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [{ statement: "A sidebar's header text is at least one, maybe two sizes larger." }],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-28T20:01:47.458Z",
  updatedAt: "2026-10-28T20:01:47.458Z",
} as const satisfies Initiative
