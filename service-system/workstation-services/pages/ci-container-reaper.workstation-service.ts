import type { WorkstationService } from "../workstation-service.page-type.ts"

export const ciContainerReaper = {
  id: "01a06829-0194-7a6d-a706-61018bb2e3ea",
  pageTypeSlug: "workstation-service",
  slug: "ci-container-reaper",
  definition: "the service clearing finished step containers off the cluster",
  runs: ["bun akasha/changes/steps/container-reaping/container-reaping.module.code.ts"],
  enabled: true,
  needsSecrets: true,
  systemd: {
    restartDelaySeconds: 10,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The reaper runs on the workstation and the step containers it reaps run on the cluster.",
    },
    {
      invariantKind: "departure",
      statement: "A step's verdict is not written here.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every write is guarded on the status it was decided from, read again just before.",
    },
    {
      invariantKind: "departure",
      statement: "Prometheus is reached through the k8s API server's service proxy.",
    },
    {
      invariantKind: "gap",
      statement:
        "Everything the reaper reads about a step or a pipeline stands in that page's file.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing the reaper writes is committed.",
    },
  ],
} as const satisfies WorkstationService
