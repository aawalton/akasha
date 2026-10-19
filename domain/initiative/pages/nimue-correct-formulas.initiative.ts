import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueCorrectFormulas = {
  id: "01a155a3-3d43-7e5e-8fed-e3c019edcd03",
  type: "page-type/initiative",
  slug: "nimue-correct-formulas",
  domain: "domain/temper",
  persona: "persona/nimue",
  intentStack: [
    {
      statement:
        "Every character stat formula has appropriate verified test cases and is believed to be correct.",
      workingMemory:
        "A stat formula is the formula file beside a temper-metric page. The temper-memory-reading service lands the game's own stats per build in each character's readings.jsonl.",
    },
    {
      statement:
        "Every tooltip formula has appropriate verified test cases and is believed to be correct.",
      workingMemory:
        "Tooltip formulas are in module/skill-value-formulas. Each reading carries the game's skill tooltip text for that build.",
    },
    {
      statement:
        "Every combat formula has appropriate verified test cases and is believed to be correct.",
      workingMemory:
        "Fights land in each character's fights.jsonl, with the build hash where the reader saw the fight live.",
    },
  ],
  createdAt: "2026-10-19T19:28:43.842Z",
  updatedAt: "2026-10-19T19:28:43.842Z",
} as const satisfies Initiative
