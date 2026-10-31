import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenStoryUnusedExports = {
  id: "01a192e4-923d-75ea-813e-8055c0dab0a9",
  type: "page-type/initiative",
  slug: "awen-story-unused-exports",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "No story module exports a name no other file uses.",
      workingMemory:
        "The audit at 123df018a54 refuses `Swept` in phase-timing.module.code.ts and `StatsKind` in path-stepping.module.code.ts.",
    },
  ],
  constraints: [
    "This initiative only coordinates, and subagents under its sub-initiatives do every implementation.",
  ],
  createdAt: "2026-10-31T16:56:55.612Z",
  updatedAt: "2026-10-31T16:56:55.612Z",
} as const satisfies Initiative
