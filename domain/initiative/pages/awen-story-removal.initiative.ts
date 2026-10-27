import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenStoryRemoval = {
  id: "01a17ebd-c381-7555-a2f4-8725060e8d3a",
  type: "page-type/initiative",
  slug: "awen-story-removal",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement:
        "The thornford, blue-boxes and personas worlds are gone, with every story in them.",
    },
    { statement: "No page names a removed story or world." },
  ],
  constraints: ["Every other world stays, with its lore and its read and written stories."],
  createdAt: "2026-10-27T19:02:08.001Z",
  updatedAt: "2026-10-27T20:09:03.800Z",
} as const satisfies Initiative
