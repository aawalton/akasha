import type { ServiceCluster } from "akasha/infrastructure/service/cluster/service-cluster.page-type.types.ts"

export const alanwaltonAtlas = {
  id: "01a05b26-f8b6-718d-afa7-a3c62e0a1196",
  type: "page-type/service-cluster",
  slug: "alanwalton-atlas",
  definition: "what draws Alan's map and takes in the locations his phone sends",
  resourceKind: "Deployment",
  namespace: "alanwalton",
  resourceName: "atlas",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifest: ["manifest/alanwalton-atlas"],
  secrets: [
    "secret/alanwalton-secrets-admin-user-id",
    "secret/alanwalton-secrets-cron-secret",
    "secret/alanwalton-secrets-geoapify-api-key",
    "secret/alanwalton-secrets-mcp-api-key",
    "secret/alanwalton-secrets-reading-relay-secret",
    "secret/alanwalton-secrets-spotify-client-id",
    "secret/alanwalton-secrets-spotify-client-secret",
    "secret/alanwalton-secrets-telnyx-public-key",
    "secret/alanwalton-secrets-webhook-secret",
    "secret/collections-secrets-scraperapi-api-key",
    "secret/collections-secrets-trakt-client-id",
    "secret/git-transport-secrets-git-access-token",
  ],
} as const satisfies ServiceCluster
