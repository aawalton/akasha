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
      statement: "Ambidextrous has a pinned share of the off-hand weapon's power.",
      workingMemory:
        "The off-hand adds round(0.237 × its power) with Ambidextrous at rank 2. Temper names the passive Dual Wield Expert. Three-Color Stalker's readings near 19:30Z on 2026-10-20 run Ambidextrous at rank 0, 1 and 2.",
    },
    {
      statement: "A set worn at mixed item levels reproduces every reading wearing it.",
      workingMemory:
        "Erin's CP150 Ashen Grip two-hander worn with CP160 pieces misses power by 3 to 6 at normal through epic. The weapon's own power matches at every quality.",
    },
    {
      statement: "Durene's armor reproduces every reading with five heavy pieces.",
      workingMemory:
        "Durene is half a point of armor short before Balanced Warrior on 11 readings. The Chudan pieces are ruled out. Only Resolve at 1716.5 for five heavy pieces fits, which no per-piece value gives. Alan captured each Tide-born piece taken off in turn.",
    },
    {
      statement: "Well-fitted has a pinned value.",
      workingMemory:
        "Well-fitted moves only dodge cost, 3856 to 3811, and Temper has no dodge-cost formula.",
    },
  ],
  constraints: [
    "A gap is worked by its own subagent, beside the other gaps.",
    "A gap is closed when every reading it named reproduces exactly or was captured while the game was mid-change.",
    "A reading a gap needs is asked of Alan once its own fit has used every reading already landed.",
  ],
  createdAt: "2026-10-20T18:20:16.239Z",
  updatedAt: "2026-10-20T19:34:06.363Z",
} as const satisfies Initiative
