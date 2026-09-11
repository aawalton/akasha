import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const cloudflared = {
  id: "01a07387-a874-7d57-b61a-8779992b0fe9",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "cloudflared",
  definition:
    "the namespace, config and deployment with the tunnel traffic reaches the cluster over",
  code: "ts",
  generatedDirectory: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pod template carries the hash of the cloudflared-creds secret.",
    },
    {
      invariantKind: "departure",
      statement: "The pod template carries the hash of the cloudflared-config configmap.",
    },
  ],
} as const satisfies Manifest
