import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionValidSkills = {
  id: "01a06152-c2d9-7726-830c-2e1d67f493b4",
  type: "page-type/module",
  slug: "companion-valid-skills",
  definition: "the set of skill ids a companion build may still slot",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A skill already on the skill bar is excluded.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Armor skills match the skill line named for the role armor weight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Guild skill lines pass without any further check.",
    },
  ],
  createdAt: "2026-09-02T08:53:28.921Z",
  updatedAt: "2026-09-21T15:26:51.000Z",
} as const satisfies Module
