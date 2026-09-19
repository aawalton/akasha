import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenEngineImprovements = {
  id: "01a0b70a-2288-7eca-8e8e-16058b9e89d1",
  type: "page-type/initiative",
  slug: "awen-engine-improvements",
  domain: "domain/story-engine",
  persona: "persona/awen",
  intentStack: [
    { statement: "Alan has approved the subfolder structure under story." },
    { statement: "No story-design-note holds content another page type would carry." },
    { statement: "The engine holds a turn and a game's state as shapes rather than as prose." },
    {
      statement:
        "A rulebook designed anew replaces both a game's rulebook and a build's game system.",
    },
  ],
} as const satisfies Initiative
