import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const headscale = {
  id: "01a0738c-9157-7c4c-906c-8ff65da0976d",
  type: "page-type/manifest",
  slug: "headscale",
  definition:
    "the workload, service and policies running the server that admits machines to the private network",
  parts: [
    "module/headscale-configmaps",
    "module/headscale-network-policies",
    "module/certificate-rolling",
  ],
  code: "ts",
  minCpuMillicores: 50,
  minMemoryMb: 256,
  killMemoryMb: 256,
  generatedDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The server reads its certificate once as the server starts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A renewed certificate reaches the server in a new pod rather than in the running pod.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pod template carries the hash of the headscale-tls secret.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys hashed from the headscale-tls secret are tls.crt and tls.key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A renewal rolls the pod.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The server's database sits on a disk of its own rather than inside the pod.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That disk is on one node, and the server runs on the node holding that disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No copy of the server's database is kept anywhere but that disk.",
    },
  ],
} as const satisfies Manifest
