import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenStoryClone = {
  id: "01a17f2d-b9f0-7bc8-b1da-c63bafa4aa4c",
  type: "page-type/initiative",
  slug: "awen-story-clone",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement:
        "A command clones a played story's own pages under new slugs, at its current state and with no turns.",
    },
    { statement: "A clone names its own game master, so the seats it starts are its own." },
    {
      statement: "One command removes a clone together with every seat that clone started.",
    },
  ],
  constraints: [
    "Only a story in the test world can be cloned or removed by these commands.",
    "A clone is played only by agents testing the engine, never offered to Alan.",
  ],
  createdAt: "2026-10-27T21:04:25.583Z",
  updatedAt: "2026-10-27T21:04:25.583Z",
} as const satisfies Initiative
