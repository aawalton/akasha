import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIiGrowth = {
  id: "01a0ed2f-56d9-71f1-964d-fcf1ec239dd9",
  type: "page-type/world-check",
  slug: "overwhere-ii-growth",
  title: "Growth",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  definition: "how earnest work grows a character's attributes and Depth in Overwhere II",
  description: "How much stronger work has made someone.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Growth is settled when a turn shows earnest work, with no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An attribute rises when a run of earnest days as long as a quarter of its value is spent on it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Depth is reached only by Descent, after enough hard workings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Descent is a trial in the Sea, faced in a dream or a thin place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Five hard workings at Surface open the way to First Depth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hard working holds a Talent steady on one task for a quarter hour or more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each Depth past Surface takes five more hard workings than the one before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each Depth doubles a Talent's reach and draw and adds five to its skill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each Depth raises most vigour as the harm check works it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala's Scope widens each time she drives Undertow to its limit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A widening of her Scope shows as new things Undertow can do.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Growth is never handed out: every gain comes from something done in play.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change is written on its page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: 'The reading is `{"character":"...","gains":[{"kind":"attribute",...}]}`.',
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No gain is ever named as a number in the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute is a stat page whose slug ends in the attribute it keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The four attributes are Might, Speed, Wits and Presence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ordinary adult has six in each; a trained soldier eight to ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Water cycling in a Talented body raises Might and Speed with each Depth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change in an attribute is written with a line of its history.",
    },
  ],
} as const satisfies WorldCheck
