import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueTooltipFormulas = {
  id: "01a15c0b-2984-7c25-8217-a9dc44883054",
  type: "page-type/initiative",
  slug: "nimue-tooltip-formulas",
  domain: "domain/temper",
  persona: "persona/nimue",
  parent: "initiative/nimue-correct-formulas",
  intentStack: [
    {
      statement:
        "A command sets every slotted skill's tooltip numbers beside Temper's, reading by reading.",
      workingMemory:
        "Tooltip formulas are in module/skill-value-formulas. Each reading carries the game's tooltip text for every slotted skill.",
    },
    {
      statement:
        "Every tooltip formula reproduces the game's tooltip number on every landed reading.",
    },
  ],
  constraints: [
    "A tooltip formula is checked against the tooltip text the game showed for that build.",
    "A tooltip number pins a tooltip formula and never a stat formula.",
  ],
  createdAt: "2026-10-21T01:19:57.827Z",
  updatedAt: "2026-10-21T01:19:57.827Z",
} as const satisfies Initiative
