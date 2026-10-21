import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueStatGaps = {
  id: "01a15a8a-ebf0-7bd1-9b5f-3661efb968a8",
  type: "page-type/initiative",
  slug: "nimue-stat-gaps",
  domain: "domain/temper",
  persona: "persona/nimue",
  parent: "initiative/nimue-correct-formulas",
  intentStack: [
    {
      statement: "A set worn at mixed item levels reproduces every reading wearing it.",
      workingMemory:
        "Power and critical lines count a two-hander twice in the mean and other lines count items, approved by Alan for now. Erin's Ashen Grip four-piece crit is 1 over on three readings with the level-50, CP10 or CP40 waist, likely rounding.",
    },
    {
      statement: "Durene's armor reproduces every reading with five heavy pieces.",
      workingMemory:
        "Durene is half a point of armor short before Balanced Warrior on 11 readings. The Chudan pieces are ruled out. Only Resolve at 1716.5 for five heavy pieces fits, which no per-piece value gives. Alan captured each Tide-born piece taken off in turn.",
    },
    {
      statement: "Well-fitted has a pinned value.",
      workingMemory:
        "Normal Well-fitted is pinned at 0.0125 of dodge cost, inside the armor-weight bracket. Erin's heavy-waist capture tells that from a separate multiplier near 0.0118.",
    },
  ],
  constraints: [
    "A gap is worked by its own subagent, beside the other gaps.",
    "A gap is closed when every reading it named reproduces exactly or was captured while the game was mid-change.",
    "A reading a gap needs is asked of Alan once its own fit has used every reading already landed.",
  ],
  createdAt: "2026-10-20T18:20:16.239Z",
  updatedAt: "2026-10-21T01:16:39.918Z",
} as const satisfies Initiative
