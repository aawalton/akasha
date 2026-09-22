import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"

export const orphanedResourcesSweep = {
  id: "01a06829-0194-7184-8190-2c4c599798bd",
  type: "page-type/service-workstation",
  slug: "orphaned-resources-sweep",
  definition: "the service saying which live cluster resources no source manifest names",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*-*-* 08:41:00",
    jitterSeconds: 60,
    catchUp: true,
    startTimeoutSeconds: 600,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the app namespaces are swept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only Deployments and Services and StatefulSets are swept in those namespaces.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource nothing labels as a deploy's is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clean sweep says nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every message this service sends is drift.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The manifests compared against are read from the code checkout beside this checkout.",
    },
  ],
} as const satisfies ServiceWorkstation
