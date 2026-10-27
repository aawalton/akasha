import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenOutcomeTiers = {
  id: "01a17ee5-1884-7164-9e0a-b59d00eb9475",
  type: "page-type/initiative",
  slug: "awen-outcome-tiers",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement:
        "A card under the player's action shows its skill, its difficulty, the outcome and the modifiers.",
    },
  ],
  constraints: [
    "Alan approves the formula before it is built.",
    "Alan approves the shape of each new page type or property before it is built.",
  ],
  createdAt: "2026-10-27T19:45:05.667Z",
  updatedAt: "2026-10-27T21:07:42.057Z",
} as const satisfies Initiative
