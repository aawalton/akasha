import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillLineQueries = {
  id: "01a06152-c2d2-725e-9e7f-499e3e6fc2f0",
  type: "page-type/module",
  slug: "companion-skill-line-queries",
  definition: "the companion skill lines a companion's equipped gear opens up",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon line is the line of the first weapon role the equipped hands fit.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Class and guild skill lines are available without regard to gear.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An armor skill line opens at the piece count its combat mechanic page states.",
    },
  ],
} as const satisfies Module
