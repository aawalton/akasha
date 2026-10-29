import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenPhaseTimingReuse = {
  id: "01a18950-2ffb-7615-89d4-1ffc7b1c42fd",
  type: "page-type/initiative",
  slug: "awen-phase-timing-reuse",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement:
        "A phase timing measures a turn from that turn's own making, not from a turn that held its slug.",
      workingMemory:
        "gifted-reborn-00-005 was taken back and its slug reused a day later. The new turn's world-builder row measured from the deleted turn's last phase end, and said 42.9 hours rather than 100 seconds. The player gap was not written for the same reason.",
    },
    {
      statement: "A player gap is measured even where a deleted turn held the same slug.",
      workingMemory:
        "playerRowOf returns null when any row carries the run, and rows of a deleted turn carry the very slug the new turn took.",
    },
  ],
  constraints: [
    "This initiative only coordinates, and subagents under its sub-initiatives do every implementation.",
    "Rows that end before the turn page was made are another turn's rows.",
  ],
  createdAt: "2026-10-29T20:18:16.186Z",
  updatedAt: "2026-10-29T20:18:16.186Z",
} as const satisfies Initiative
