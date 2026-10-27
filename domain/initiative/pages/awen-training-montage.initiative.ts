import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenTrainingMontage = {
  id: "01a17ed8-4c2c-7885-a0b1-14d6faa975d6",
  type: "page-type/initiative",
  slug: "awen-training-montage",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [],
  constraints: [
    "A montage pays out exactly what playing each of its sessions would have.",
    "A montage is asked for in the player's own words, with no control of its own.",
    "Alan approves the shape of each new page type or property before it is built.",
  ],
  createdAt: "2026-10-27T19:31:06.923Z",
  updatedAt: "2026-10-27T23:59:20.582Z",
} as const satisfies Initiative
