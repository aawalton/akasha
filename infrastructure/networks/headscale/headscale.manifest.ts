import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const headscale = {
  id: "01a0738c-9157-7c4c-906c-8ff65da0976d",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "headscale",
  definition:
    "the workload, service and policies running the server that admits machines to the private network",
  parts: ["module/headscale-configmaps", "module/headscale-network-policies"],
  code: "ts",
  generatedDirectory: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The server reads its certificate once as the server starts.",
    },
    {
      invariantKind: "departure",
      statement:
        "A renewed certificate reaches the server in a new pod rather than in the running pod.",
    },
    {
      invariantKind: "departure",
      statement: "The pod template carries the hash of the headscale-tls secret.",
    },
    {
      invariantKind: "departure",
      statement: "The keys hashed from the headscale-tls secret are tls.crt and tls.key.",
    },
    {
      invariantKind: "departure",
      statement: "A renewal rolls the pod.",
    },
    {
      invariantKind: "departure",
      statement: "The pod template carries the hash of the headscale-s3-creds secret.",
    },
    {
      invariantKind: "departure",
      statement:
        "The keys hashed from the headscale-s3-creds secret are access_key and secret_key.",
    },
  ],
} as const satisfies Manifest
