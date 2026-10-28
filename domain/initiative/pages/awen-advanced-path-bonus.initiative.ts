import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenAdvancedPathBonus = {
  id: "01a18494-2654-76c8-869b-c08eaae6f0d9",
  type: "page-type/initiative",
  slug: "awen-advanced-path-bonus",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "An action check on an Advanced Path adds ten for each Tier passed." },
  ],
  constraints: ["Only Alan takes turns in gifted-reborn."],
  createdAt: "2026-10-28T22:14:24.083Z",
  updatedAt: "2026-10-28T22:14:24.083Z",
} as const satisfies Initiative
