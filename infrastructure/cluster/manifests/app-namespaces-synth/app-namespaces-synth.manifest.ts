import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const appNamespacesSynth = {
  id: "01a06810-1262-75ee-aa84-9009c06798cf",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "app-namespaces-synth",
  definition: "the namespaces the cluster has one application in each of",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every namespace named here has one application in it.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace no workload sits in is not named here.",
    },
  ],
} as const satisfies Manifest
