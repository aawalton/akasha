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
        "Fights land in each character's fights.jsonl, with the build hash where the reader saw the fight live. Charged weapons and Bloodthirsty jewelry move no sheet stat, so a combat case pins each at every quality.",
    },
    {
      statement: "Every game mechanic that affects combat has been accounted for.",
    },
  ],
  constraints: [
    "A verified test case is a number the game showed for a captured build state.",
    "A formula passes a verified test case only by reproducing that number exactly.",
    "A number from a guide or another site is never a verified test case.",
    "A tooltip number is never a verified test case for a stat formula, and there tooltip text only plans a case.",
    "Every term that changes a formula's result has a verified test case.",
    "Nimue may ask Alan for a build change that yields a test case or the data a formula needs.",
    "Alan approves as final only a formula a developer would be unlikely to have written.",
    "Nimue hands a large task to a subagent and keeps to coordinating the work.",
    "A stat is worked before every stat its formula reads.",
    "Each formula starts from a build with as little configured as the game allows.",
    "A term is verified by a case that adds it alongside others, where enough readings agree.",
    "Nimue changes any command the work needs without asking Alan.",
    "Every deploy runs in the background, so no deploy blocks the work.",
    "A calculation change lands with the stat-case pins it closes, after the stat-case test passes on both.",
  ],
  createdAt: "2026-10-19T19:28:43.842Z",
  updatedAt: "2026-10-21T15:37:05.030Z",
} as const satisfies Initiative
