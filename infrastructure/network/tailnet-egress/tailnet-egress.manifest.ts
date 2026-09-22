import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const tailnetEgress = {
  id: "01a0738e-d1b0-7ee3-877d-2bfed39ea842",
  type: "page-type/manifest",
  slug: "tailnet-egress",
  definition:
    "the deployment, service and policies of the proxy carrying traffic out over the private network",
  code: "ts",
  generatedDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The proxy's private-network enrolment sits on a disk of its own rather than inside the pod.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That disk is on one node, and the proxy runs on the node holding that disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A restart finds the enrolment on that disk rather than enrolling a fresh node.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The running pod goes before its replacement starts, so one proxy holds that disk at a time.",
    },
  ],
} as const satisfies Manifest
