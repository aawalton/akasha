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
    {
      invariantKind: "absence",
      statement: "No deploy path prunes a cluster object.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing in this repository deletes a namespace.",
    },
    {
      invariantKind: "constraint",
      statement: "A namespace named nowhere here is on the cluster until a hand deletes it.",
    },
    {
      invariantKind: "gap",
      statement:
        "`collections` `connect` `design-system` `relationships` and `tracking` are named nowhere here.",
    },
    {
      invariantKind: "absence",
      statement: "No page defines the `collections-s3-creds` Secret.",
    },
    {
      invariantKind: "constraint",
      statement: "The only copy of what `collections-s3-creds` holds is the one on the cluster.",
    },
    {
      invariantKind: "absence",
      statement: "No workload reads the `collections-secrets` Secret.",
    },
    {
      invariantKind: "gap",
      statement:
        "A page placing a value into `collections-secrets` places it where nothing reads it.",
    },
  ],
} as const satisfies Manifest
