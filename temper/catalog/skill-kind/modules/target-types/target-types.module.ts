import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const targetTypes = {
  id: "01a060db-b2bf-7d23-9d53-a943f51ee61c",
  type: "page-type/module",
  slug: "target-types",
  definition: "who a skill effect reaches, from the caster alone to the ground under it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
  ],
} as const satisfies Module
