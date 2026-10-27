import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenTestStory = {
  id: "01a17ebf-60e0-7113-aaf7-7b557cdbdc9f",
  type: "page-type/initiative",
  slug: "awen-test-story",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "The test story names a panel in each of the character, journal and chat places.",
    },
  ],
  constraints: [
    "The test story is played only by agents testing the engine, never offered to Alan.",
  ],
  createdAt: "2026-10-27T19:03:53.823Z",
  updatedAt: "2026-10-27T19:47:26.482Z",
} as const satisfies Initiative
