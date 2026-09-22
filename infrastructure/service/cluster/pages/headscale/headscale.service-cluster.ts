import type { ServiceCluster } from "akasha/infrastructure/service/cluster/service-cluster.page-type.types.ts"

export const headscale = {
  id: "01a06812-2380-7204-bb6c-c05c012bbf72",
  type: "page-type/service-cluster",
  slug: "headscale",
  definition:
    "the server admitting a machine to the private network and telling it where the others are",
  resourceKind: "StatefulSet",
  namespace: "headscale",
  resourceName: "headscale",
  image: "headscale/headscale:0.28.0",
  replicas: 1,
  containerPort: 8443,
  manifest: ["manifest/headscale"],
  secrets: [
    "secret/headscale-secrets-noise-private-key",
    "secret/headscale-secrets-oidc-client-secret",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "A certificate renewal reaches the server serving that certificate.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The server reads its certificate once and serves that certificate until the server ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pod is rolled by the certificate's checksum changing where the manifest is applied again.",
    },
  ],
} as const satisfies ServiceCluster
