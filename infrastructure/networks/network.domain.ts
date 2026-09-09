import type { Domain } from "../../domains/domain.page-type.ts"

export const network = {
  id: "01a0658b-0f02-7e55-94d1-d612c0ed6115",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "network",
  definition: "what a program reaches other machines over",
  pluralSlug: "networks",
  parts: [
    "domain/certificate",
    "manifest/cloudflared",
    "manifest/ddns-headscale",
    "manifest/headscale",
    "manifest/tailnet-egress",
    "manifest/talos-subnet-router",
    "module/headscale-constants",
    "workspace-package/auth-proxy",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Traffic reaches the cluster through a tunnel opened from inside the cluster.",
    },
    {
      invariantKind: "departure",
      statement: "No port is opened to the cluster from outside.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name a machine joins the private network by answers at the cluster's public address.",
    },
    {
      invariantKind: "departure",
      statement: "A workload in the cluster reaches a machine at that machine's local address.",
    },
    {
      invariantKind: "departure",
      statement:
        "No workload reaches a machine by the name that machine joins the private network by.",
    },
  ],
} as const satisfies Domain
