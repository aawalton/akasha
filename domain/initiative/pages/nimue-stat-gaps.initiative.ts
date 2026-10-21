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
        "Power and critical lines count a two-hander twice in the mean and other lines count items, approved by Alan for now. Erin's Ashen Grip four-piece crit is 1 over on three readings whose piece mean is worth level 32, where 657 times 0.5236 gives 344.005 and the game shows 343. No rounding of the mean, the share or the product and no 32-bit float fits every set-scaling case, while a below-normal slope from 0.011621 to 0.011631 does.",
    },
  ],
  constraints: [
    "A gap is worked by its own subagent, beside the other gaps.",
    "A gap is closed when every reading it named reproduces exactly or was captured while the game was mid-change.",
    "A reading a gap needs is asked of Alan once its own fit has used every reading already landed.",
  ],
  createdAt: "2026-10-20T18:20:16.239Z",
  updatedAt: "2026-10-21T15:47:37.399Z",
} as const satisfies Initiative
