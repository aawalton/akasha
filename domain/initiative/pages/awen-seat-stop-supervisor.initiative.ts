import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenSeatStopSupervisor = {
  id: "01a18e7a-d967-719f-85fd-9307bb4307e5",
  type: "page-type/initiative",
  slug: "awen-seat-stop-supervisor",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "Stopping a seat signals its supervisor process as well as its client.",
      workingMemory:
        "agent/seat/stopping/seat-stopping.module.code.ts line 48 matches `supervisor\\.ts`, and a live supervisor runs `.../run-supervisor/run-supervisor.module.code.ts`, so the pattern misses it.",
    },
  ],
  constraints: [
    "This initiative only coordinates, and subagents under its sub-initiatives do every implementation.",
  ],
  createdAt: "2026-10-30T20:22:58.151Z",
  updatedAt: "2026-10-30T20:22:58.151Z",
} as const satisfies Initiative
