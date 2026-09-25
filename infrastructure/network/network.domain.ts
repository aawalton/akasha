import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const network = {
  id: "01a0658b-0f02-7e55-94d1-d612c0ed6115",
  type: "page-type/domain",
  slug: "network",
  definition: "how a program calls another machine",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "network" },
    { partOfSpeech: "part-of-speech/noun", spelling: "networks" },
  ],
  parts: [
    "domain/auth-proxy",
    "domain/certificate",
    "manifest/cloudflared",
    "manifest/ddns-headscale",
    "manifest/headscale",
    "manifest/tailnet-egress",
    "manifest/talos-subnet-router",
    "module/headscale-constants",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Traffic reaches the cluster through a tunnel opened from inside the cluster.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No port is opened to the cluster from outside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The name a machine joins the private network by answers at the cluster's public address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A workload in the cluster reaches a machine at that machine's local address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "No workload reaches a machine by the name that machine joins the private network by.",
    },
  ],
} as const satisfies Domain
