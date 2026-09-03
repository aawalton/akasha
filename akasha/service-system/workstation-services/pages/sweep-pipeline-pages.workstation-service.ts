import type { WorkstationService } from "../workstation-service.page-type.ts"

export const sweepPipelinePages = {
  id: "01a06829-0194-7c65-9758-b90dcc1624fc",
  pageTypeSlug: "workstation-service",
  slug: "sweep-pipeline-pages",
  definition:
    "the service carrying every unfinished pipeline, workflow and step to its next status",
  runs: [
    "bun akasha/changes/pipelines/pipeline-page-sweeping/pipeline-page-sweeping.module.code.ts",
  ],
  enabled: true,
  needsSecrets: true,
  systemd: {
    restartDelaySeconds: 10,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "One process sweeps every pipeline, rather than one process for each.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here chooses a workflow, creates one, or overtakes a pipeline.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline on main waits while an older pipeline of that branch is underway.",
    },
    {
      invariantKind: "departure",
      statement:
        "A step's verdict is read from its container, and the container reports nothing back.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster read that fails moves no step off `launching` or `running` that tick.",
    },
    {
      invariantKind: "departure",
      statement:
        "A workflow's deployed commit and inputs hash are read here and written by a deploy.",
    },
    {
      invariantKind: "gap",
      statement: "This runs.",
    },
  ],
} as const satisfies WorkstationService
