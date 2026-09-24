import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const alanwaltonWeb = {
  id: "01a05b26-f8b6-7a67-91f5-db8495f03998",
  type: "page-type/service-cluster",
  slug: "alanwalton-web",
  definition: "what runs Alan's command center in the cluster",
  resourceKind: "Deployment",
  namespace: "alanwalton",
  resourceName: "web",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifest: ["manifest/alanwalton-web"],
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
