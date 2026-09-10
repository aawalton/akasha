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
      statement: "The server reads its certificate once, as the server starts.",
    },
    {
      invariantKind: "departure",
      statement:
        "A renewed certificate reaches the server in a new pod rather than in the running one.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pod template carries the hash of the certificate secret, so a renewal rolls the pod.",
    },
  ],
} as const satisfies Manifest
