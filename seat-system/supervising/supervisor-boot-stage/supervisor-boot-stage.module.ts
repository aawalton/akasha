import type { Module } from "@akasha/code-system/module"

export const supervisorBootStage = {
  id: "01a0683e-3dbe-700d-8afe-952b34ffad1a",
  pageTypeSlug: "module",
  slug: "supervisor-boot-stage",
  definition: "how long each stage of a supervisor's boot took",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stage still pending past its notice window says so while it waits.",
    },
    {
      invariantKind: "departure",
      statement: "A stage that throws says how long it ran before it threw.",
    },
  ],
} as const satisfies Module
