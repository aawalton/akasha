import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const cloudflared = {
  id: "01a07387-a874-7d57-b61a-8779992b0fe9",
  type: "page-type/manifest",
  slug: "cloudflared",
  definition: "the namespace, config and deployment with the tunnel traffic takes to the cluster",
  code: "ts",
  generatedDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pod template carries the hash of the cloudflared-creds secret.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key hashed from the cloudflared-creds secret is credentials.json.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pod template carries the hash of the cloudflared-config configmap.",
    },
  ],
} as const satisfies Manifest
