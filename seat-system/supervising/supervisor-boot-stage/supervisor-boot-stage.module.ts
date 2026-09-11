import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorBootStage = {
  id: "01a0683e-3dbe-700d-8afe-952b34ffad1a",
  pageTypeSlug: "module",
  type: "module",
  slug: "supervisor-boot-stage",
  definition: "how long each stage of a supervisor's boot took",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stage still pending past its notice window says so while that stage waits.",
    },
    {
      invariantKind: "departure",
      statement: "A stage that throws says how long that stage ran before that stage threw.",
    },
  ],
} as const satisfies Module
