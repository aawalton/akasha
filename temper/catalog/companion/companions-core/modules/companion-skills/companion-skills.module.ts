import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkills = {
  id: "01a06119-5caa-75f4-bbef-65ed8a22afa9",
  type: "page-type/module",
  slug: "companion-skills",
  definition: "every skill a companion may put on its bar, held in one table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A skill's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A skill moved to another place breaks every build hash saved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is divided across runs.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "No akasha file passes fifteen thousand bytes.",
    },
  ],
} as const satisfies Module
