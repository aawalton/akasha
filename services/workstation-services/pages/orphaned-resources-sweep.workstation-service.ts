import type { WorkstationService } from "../workstation-service.page-type.types.ts"

export const orphanedResourcesSweep = {
  id: "01a06829-0194-7184-8190-2c4c599798bd",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "orphaned-resources-sweep",
  definition: "the service saying which live cluster resources no source manifest accounts for",
  runs: ["bun infrastructure/cluster/manifests/orphan-sweeping/orphan-sweeping.module.code.ts"],
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*-*-* 08:41:00",
    jitterSeconds: 60,
    catchUp: true,
    startTimeoutSeconds: 600,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only the app namespaces are swept.",
    },
    {
      invariantKind: "departure",
      statement: "Only Deployments and Services and StatefulSets are swept in those namespaces.",
    },
    {
      invariantKind: "departure",
      statement: "A resource nothing labels as a deploy's is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A clean sweep says nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every message this service sends is drift.",
    },
    {
      invariantKind: "departure",
      statement:
        "The manifests compared against are read from the code checkout beside this checkout.",
    },
  ],
} as const satisfies WorkstationService
