import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenGiftedPaths = {
  id: "01a17ff0-e4ed-79df-b43b-68c3e4b2acef",
  type: "page-type/initiative",
  slug: "awen-gifted-paths",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [{ statement: "Using a Path is a fixed mechanical change made without a turn." }],
  createdAt: "2026-10-28T00:37:36.108Z",
  updatedAt: "2026-10-28T01:52:46.956Z",
} as const satisfies Initiative
