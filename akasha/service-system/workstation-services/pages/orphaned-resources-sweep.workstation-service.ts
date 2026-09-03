import type { WorkstationService } from "../workstation-service.page-type.ts"

export const orphanedResourcesSweep = {
  id: "01a06829-0194-7184-8190-2c4c599798bd",
  pageTypeSlug: "workstation-service",
  slug: "orphaned-resources-sweep",
  definition: "the service saying which live cluster resources no source manifest accounts for",
  runs: [
    "bun akasha/infrastructure/cluster-manifests/orphan-sweeping/orphan-sweeping.module.code.ts",
  ],
  enabled: true,
  systemd: {
    schedule: "*-*-* 08:41:00",
    jitterSeconds: 60,
    catchUp: true,
    startTimeoutSeconds: 600,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Only the app namespaces are swept, and in them only Deployments, Services and StatefulSets.",
    },
    {
      invariantKind: "departure",
      statement: "A resource nothing labels as a deploy's is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A clean sweep says nothing, so every message this sends is drift.",
    },
    {
      invariantKind: "departure",
      statement: "The manifests compared against are read from the code checkout beside this one.",
    },
  ],
} as const satisfies WorkstationService
