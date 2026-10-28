import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenCentrePlaceBody = {
  id: "01a1842a-b59a-71d1-a059-ff8e4440ce1c",
  type: "page-type/initiative",
  slug: "awen-centre-place-body",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "A place taking over the centre column shows its tabs and its body." },
  ],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-28T20:19:13.945Z",
  updatedAt: "2026-10-28T20:19:13.945Z",
} as const satisfies Initiative
