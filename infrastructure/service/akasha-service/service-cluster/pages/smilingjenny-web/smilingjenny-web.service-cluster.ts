import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const smilingjennyWeb = {
  id: "01a05b26-f8b6-70f1-b1ef-8cafc8f8b6e6",
  type: "page-type/service-cluster",
  slug: "smilingjenny-web",
  definition: "what runs Jenny's command center in the cluster",
  resourceKind: "Deployment",
  namespace: "smilingjenny",
  resourceName: "web",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifest: ["manifest/smilingjenny-web-manifests"],
  secrets: [
    "secret/alanwalton-secrets-handover-public-key",
    "secret/alanwalton-secrets-reading-relay-secret",
    "secret/git-transport-secrets-git-access-token",
    "secret/smilingjenny-secrets-session-key",
    "secret/smilingjenny-secrets-smilingjenny-ring-credential",
  ],
} as const satisfies ServiceCluster
