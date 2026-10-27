import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenDifficulty = {
  id: "01a17ed4-3824-790d-ac09-efe9d86a0123",
  type: "page-type/initiative",
  slug: "awen-difficulty",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "A difficulty level says how bad a failure may get." },
    { statement: "The game master is served the stance of the story's difficulty level." },
    {
      statement:
        "The player changes the difficulty level from the play screen, and it holds from the next beat.",
    },
  ],
  constraints: [
    "Rewards are the same at every difficulty level.",
    "Alan approves the shape of each new page type or property before it is built.",
  ],
  createdAt: "2026-10-27T19:26:39.651Z",
  updatedAt: "2026-10-27T20:28:46.844Z",
} as const satisfies Initiative
