import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenCharacterData = {
  id: "01a17ead-74c1-7bc6-853a-b8e38597db67",
  type: "page-type/initiative",
  slug: "awen-character-data",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "A skill states the attribute that governs it." },
    { statement: "A skill states its experience toward its next level." },
    { statement: "A character states the titles it holds." },
    { statement: "Level-up choices are a generic mechanic rather than The Tower's alone." },
  ],
  constraints: ["Alan approves the shape of each new page type or property before it is built."],
  createdAt: "2026-10-27T18:44:19.264Z",
  updatedAt: "2026-10-27T19:00:51.455Z",
} as const satisfies Initiative
