import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorBootStage = {
  id: "01a0683e-3dbe-700d-8afe-952b34ffad1a",
  type: "page-type/module",
  slug: "supervisor-boot-stage",
  definition: "the time each step needs when a supervisor starts",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stage still pending past its notice window says so while that stage waits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stage that throws says how long that stage ran before that stage threw.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T14:46:58.866Z",
} as const satisfies Module
