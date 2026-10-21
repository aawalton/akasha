import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueStatGaps = {
  id: "01a15a8a-ebf0-7bd1-9b5f-3661efb968a8",
  type: "page-type/initiative",
  slug: "nimue-stat-gaps",
  domain: "domain/temper",
  persona: "persona/nimue",
  parent: "initiative/nimue-correct-formulas",
  constraints: [
    "A gap is worked by its own subagent, beside the other gaps.",
    "A gap is closed when every reading it named reproduces exactly or was captured while the game was mid-change.",
    "A reading a gap needs is asked of Alan once its own fit has used every reading already landed.",
  ],
  createdAt: "2026-10-20T18:20:16.239Z",
  updatedAt: "2026-10-21T15:55:27.278Z",
} as const satisfies Initiative
