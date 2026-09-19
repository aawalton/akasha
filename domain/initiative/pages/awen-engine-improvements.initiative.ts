import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenEngineImprovements = {
  id: "01a0b70a-2288-7eca-8e8e-16058b9e89d1",
  type: "page-type/initiative",
  slug: "awen-engine-improvements",
  domain: "domain/story-engine",
  persona: "persona/awen",
  intentStack: [
    { statement: "Alan has approved the subfolder structure under story." },
    {
      statement:
        "A turn, a rulebook and a mechanic designed as one replace what the engine holds now.",
    },
    { statement: "No story-design-note holds content another page type would carry." },
  ],
} as const satisfies Initiative
