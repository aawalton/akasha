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
      statement: "Armor under Balanced Warrior reproduces every Durene and Lyonette reading.",
      workingMemory:
        "Balanced Warrior's 2% is rounded to nearest, which fixes Durene and breaks Lyonette by 1 unless one category is floored apart: the Lady's 4297 or the Fortified star's 1731. Lyonette as in 01a1559d-3ef7 with Fortified unslotted tells them apart.",
    },
  ],
  constraints: [
    "A gap is worked by its own subagent, beside the other gaps.",
    "A gap is closed when every reading it named reproduces exactly or was captured while the game was mid-change.",
    "A reading a gap needs is asked of Alan once its own fit has used every reading already landed.",
  ],
  createdAt: "2026-10-20T18:20:16.239Z",
  updatedAt: "2026-10-21T01:21:40.356Z",
} as const satisfies Initiative
