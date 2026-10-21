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
        "Every tooltip formula reproduces the game's tooltip number on every landed reading.",
      workingMemory:
        "`akasha temper tooltip-compare` sets each number beside Temper's. Misses: Erin's Ardent Flame and Draconic damage and Summon Shade 1 or 5 off; Health-scaled shields by hundreds; equations stating a ratio, such as Swarming Scion, Scalding Rune and Pack Leader, on every reading; constants a passive moves, such as pet health, Dark Conversion, Swallow Soul and Drain Vigor.",
    },
  ],
  constraints: [
    "A tooltip formula is checked against the tooltip text the game showed for that build.",
    "A tooltip number pins a tooltip formula and never a stat formula.",
  ],
  createdAt: "2026-10-21T01:19:57.827Z",
  updatedAt: "2026-10-21T14:17:52.044Z",
} as const satisfies Initiative
