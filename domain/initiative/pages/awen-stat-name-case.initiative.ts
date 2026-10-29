import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenStatNameCase = {
  id: "01a1881e-3173-74e4-b3e1-ebbfac295952",
  type: "page-type/initiative",
  slug: "awen-stat-name-case",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "An attribute name is drawn as the world states it, not in capitals." },
  ],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-29T14:44:02.546Z",
  updatedAt: "2026-10-29T14:44:02.546Z",
} as const satisfies Initiative
