import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkills08 = {
  id: "01a06119-5cad-7262-9e2d-fc95d2da9a5d",
  type: "page-type/module",
  slug: "companion-skills-08",
  definition: "a run of companion skills, in the order the whole table names them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "These bytes are the last good build rather than the bytes the generator emits today.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The generator that wrote these bytes cannot run today.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Nothing in akasha reproduces these bytes.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "These skills are one unbroken run of the whole table's order.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A skill moved between runs breaks every build hash saved.",
    },
  ],
} as const satisfies Module
