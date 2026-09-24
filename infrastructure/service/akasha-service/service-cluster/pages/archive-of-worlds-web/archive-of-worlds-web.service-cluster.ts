import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const archiveOfWorldsWeb = {
  id: "01a05b26-f8b6-7d0c-8371-3abedb498e0f",
  type: "page-type/service-cluster",
  slug: "archive-of-worlds-web",
  definition: "what serves the site holding published original stories",
  resourceKind: "Deployment",
  namespace: "archive-of-worlds",
  resourceName: "web",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifest: ["manifest/archive-of-worlds-web-manifests"],
  secrets: [
    "secret/alanwalton-secrets-google-oauth-client-id",
    "secret/alanwalton-secrets-google-oauth-client-secret",
    "secret/alanwalton-secrets-handover-public-key",
    "secret/archive-of-worlds-secrets-session-key",
    "secret/git-transport-secrets-git-access-token",
  ],
} as const satisfies ServiceCluster
