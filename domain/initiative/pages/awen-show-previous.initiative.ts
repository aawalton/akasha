import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenShowPrevious = {
  id: "01a1837a-85d1-7cb3-9945-c41760730b14",
  type: "page-type/initiative",
  slug: "awen-show-previous",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement:
        "At the top of the play page, Show Previous loads the chapter before what is shown.",
    },
  ],
  createdAt: "2026-10-28T17:06:47.376Z",
  updatedAt: "2026-10-28T17:06:47.376Z",
} as const satisfies Initiative
