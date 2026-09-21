import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenEngineImprovements = {
  id: "01a0b70a-2288-7eca-8e8e-16058b9e89d1",
  type: "page-type/initiative",
  slug: "awen-engine-improvements",
  domain: "domain/story-engine",
  persona: "persona/awen",
  intentStack: [
    {
      statement:
        "A mechanic a game needs and no page holds becomes a page in the turn that needs it.",
    },
    { statement: "A game's interface is loaded from pages rather than built with the app." },
    { statement: "A played story is drawn by that loader." },
    { statement: "No story-design-note holds content another page type would carry." },
  ],
} as const satisfies Initiative
