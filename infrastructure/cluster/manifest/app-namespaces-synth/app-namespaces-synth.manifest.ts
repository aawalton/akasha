import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const appNamespacesSynth = {
  id: "01a06810-1262-75ee-aa84-9009c06798cf",
  type: "page-type/manifest",
  slug: "app-namespaces-synth",
  definition: "the namespaces holding one application each in the cluster",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every namespace named here has one application in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A namespace no workload sits in is not named here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No deploy path prunes a cluster object.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing in this repository deletes a namespace.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A namespace named nowhere here is on the cluster until a hand deletes it.",
    },
  ],
} as const satisfies Manifest
