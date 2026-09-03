import type { WorkstationService } from "../workstation-service.page-type.ts"

export const ciOrchestrator = {
  id: "01a06829-0194-7803-91b9-38a7f2d82cba",
  pageTypeSlug: "workstation-service",
  slug: "ci-orchestrator",
  definition: "the service answering a pipeline whose failure a later run cured",
  runs: ["bun services/ci-orchestrator.ts"],
  enabled: false,
  systemd: {
    restartDelaySeconds: 10,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pipeline, workflow and step pages are read and written as files.",
    },
    {
      invariantKind: "absence",
      statement: "No database connection is held.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline is owed a verdict while any workflow or step under it is unsettled.",
    },
    {
      invariantKind: "departure",
      statement:
        "Answering a pipeline elsewhere carries to its failed and blocked workflows and steps.",
    },
    {
      invariantKind: "gap",
      statement: "The orchestrator runs.",
    },
  ],
} as const satisfies WorkstationService
