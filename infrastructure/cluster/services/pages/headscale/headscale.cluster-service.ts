import type { ClusterService } from "../../cluster-service.page-type.types.ts"

export const headscale = {
  id: "01a06812-2380-7204-bb6c-c05c012bbf72",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "headscale",
  definition:
    "the server admitting a machine to the private network and telling it where the others are",
  resourceKind: "StatefulSet",
  namespace: "headscale",
  resourceName: "headscale",
  image: "headscale/headscale:0.28.0",
  replicas: 1,
  containerPort: 8443,
  manifest: "headscale",
  secrets: [
    "secret/headscale-secrets-noise-private-key",
    "secret/headscale-secrets-oidc-client-secret",
    "secret/headscale-s3-creds-access-key",
    "secret/headscale-s3-creds-secret-key",
  ],
  invariants: [
    {
      invariantKind: "gap",
      statement: "A certificate renewal reaches the server serving that certificate.",
    },
    {
      invariantKind: "constraint",
      statement: "The server reads its certificate once and serves that one until the server ends.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pod is rolled by the certificate's checksum changing where the manifest is applied again.",
    },
  ],
} as const satisfies ClusterService
