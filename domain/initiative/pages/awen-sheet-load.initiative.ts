import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenSheetLoad = {
  id: "01a1844b-5e99-7387-b83b-f699dc0514bb",
  type: "page-type/initiative",
  slug: "awen-sheet-load",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "A played story's character sheet draws within a second of the page loading." },
  ],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-28T20:54:54.360Z",
  updatedAt: "2026-10-28T20:54:54.360Z",
} as const satisfies Initiative
