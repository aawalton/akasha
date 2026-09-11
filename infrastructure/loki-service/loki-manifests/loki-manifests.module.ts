import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const lokiManifests = {
  id: "01a06816-68b1-7345-a4a7-66ab2bbf829e",
  pageTypeSlug: "module",
  type: "module",
  slug: "loki-manifests",
  definition: "the namespace, configuration, deployment and service manifests Loki runs as",
  code: "ts",
  allowsTmpPaths: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pod template carries the hash of the loki-s3-creds secret.",
    },
    {
      invariantKind: "departure",
      statement: "The keys hashed from the loki-s3-creds secret are access_key and secret_key.",
    },
    {
      invariantKind: "departure",
      statement: "The pod template carries the hash of the loki-config configmap.",
    },
  ],
} as const satisfies Module
