import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenTurnUnusedExports = {
  id: "01a192a9-06a1-7747-b59d-b88a7f4b06a7",
  type: "page-type/initiative",
  slug: "awen-turn-unused-exports",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "No story turn module exports a name no other file uses.",
      workingMemory:
        "The audit at 77628b14d36 refuses `Stepped` in turn-step-timing.module.code.ts and `HELD_AT` in turn-making.module.test-fixtures.ts.",
    },
  ],
  constraints: [
    "This initiative only coordinates, and subagents under its sub-initiatives do every implementation.",
  ],
  createdAt: "2026-10-31T15:51:53.248Z",
  updatedAt: "2026-10-31T15:51:53.248Z",
} as const satisfies Initiative
