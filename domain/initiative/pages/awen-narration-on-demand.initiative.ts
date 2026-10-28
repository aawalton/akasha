import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenNarrationOnDemand = {
  id: "01a18358-ab1e-785f-975f-6bc5f0972efd",
  type: "page-type/initiative",
  slug: "awen-narration-on-demand",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "A story's audio narration is made only when the player asks to hear it." },
  ],
  createdAt: "2026-10-28T16:29:48.701Z",
  updatedAt: "2026-10-28T16:29:48.701Z",
} as const satisfies Initiative
