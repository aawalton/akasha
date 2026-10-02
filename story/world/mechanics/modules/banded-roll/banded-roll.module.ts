import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bandedRoll = {
  id: "01a0e3a2-2fc9-767e-908f-ac448b65c488",
  type: "page-type/module",
  slug: "banded-roll",
  definition: "how well a roll with its bonuses comes off against the target of a named band",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An act is one die plus every bonus the act earns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An easy act's target is 8, a standard act's 12, a hard act's 16, an extreme act's 20.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus names what it comes from and runs from minus four to four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check settling this way may let each bonus run wider than four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act's bonuses add to at most six either way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An act comes off strongly by five over, at its target, at a cost within four under, else fails.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A crit comes off strongly and a fumble fails, whatever the margin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every check settling this way imports this rule rather than stating it again.",
    },
  ],
} as const satisfies Module
