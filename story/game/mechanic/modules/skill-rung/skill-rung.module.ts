import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillRung = {
  id: "01a0c508-73ed-79f5-80cd-8de86a40fac3",
  type: "page-type/module",
  slug: "skill-rung",
  definition: "the seven rungs a skill climbs, each with what it takes to cross and what it means",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung says what a skill's holder has shown they can do.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung's width is how many levels that rung holds before promotion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The widths are five, ten, twenty-five, fifty, a hundred, and two hundred and fifty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The widths grow, so a rung higher up takes more to cross than one below it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sage has no width, there being no rung above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The number a skill shows is its level within its rung rather than a lifetime total.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What tells one rung from the one below is who the move came from, not how fast it was.",
    },
  ],
} as const satisfies Module
