import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenAbilityKinds = {
  id: "01a17fea-fe67-7500-91b0-da2ebf961f24",
  type: "page-type/initiative",
  slug: "awen-ability-kinds",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement:
        "A world names its own kinds of ability, and the UI calls each ability by its kind's name.",
    },
  ],
  createdAt: "2026-10-28T00:31:09.415Z",
  updatedAt: "2026-10-28T00:31:09.415Z",
} as const satisfies Initiative
