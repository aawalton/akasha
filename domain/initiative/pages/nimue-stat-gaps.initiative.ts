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
        "Erin's CP150 Ashen Grip two-hander worn with CP160 pieces misses power by 3 to 6. Counting the two-hander twice in the 3- and 4-piece lines closes Erin's gaps and puts Mrsha's Darloc Brae 3-piece at 124 against the game's 123. Mrsha's back-bar capture with two superior jewelry pieces tells the two apart.",
    },
    {
      statement: "Weapon power is one curve, with a multiplier for two-handed melee weapons.",
      workingMemory:
        "One-handers, bows and staves share 1037 at normal CP160. Two-handed melee is 1220, about 20/17 of that, and Temper holds it as per-type values.",
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
  updatedAt: "2026-10-20T19:40:06.586Z",
} as const satisfies Initiative
