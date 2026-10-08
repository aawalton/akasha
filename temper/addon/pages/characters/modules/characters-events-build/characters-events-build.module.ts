import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersEventsBuild = {
  id: "01a0632d-cba3-7016-85c9-1835035387d2",
  type: "page-type/module",
  slug: "characters-events-build",
  definition: "what this add-on does when the played character's build changes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of build changes is read once after the run settles.",
    },
  ],
  createdAt: "2026-09-02T17:32:20.771Z",
  updatedAt: "2026-09-21T17:05:12.000Z",
} as const satisfies Module
