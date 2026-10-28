import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenCentralSurface = {
  id: "01a183a5-4582-762e-b4a9-44d6875a266f",
  type: "page-type/initiative",
  slug: "awen-central-surface",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "A played story's central panel is one surface higher, as Voyage's is." },
  ],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-28T17:53:28.962Z",
  updatedAt: "2026-10-28T17:53:28.962Z",
} as const satisfies Initiative
