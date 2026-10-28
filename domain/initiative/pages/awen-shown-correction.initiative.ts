import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenShownCorrection = {
  id: "01a182ea-072c-7832-be1b-b68ba033520f",
  type: "page-type/initiative",
  slug: "awen-shown-correction",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "A shown beat can be corrected in place, and every page it changed follows." },
    { statement: "No rule bars rewriting what the player has already read." },
  ],
  createdAt: "2026-10-28T14:28:57.771Z",
  updatedAt: "2026-10-28T14:28:57.771Z",
} as const satisfies Initiative
