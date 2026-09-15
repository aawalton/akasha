import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorBootStage = {
  id: "01a0683e-3dbe-700d-8afe-952b34ffad1a",
  type: "page-type/module",
  slug: "supervisor-boot-stage",
  definition: "how long each stage of a supervisor's boot took",
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
} as const satisfies Module
