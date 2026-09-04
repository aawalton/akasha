import type { Command } from "@akasha/command-system/command"

export const talosHealth = {
  id: "01a06810-1f0b-7aac-ab38-a6658f91ee11",
  pageTypeSlug: "command",
  slug: "talos-health",
  definition: "the command running the talosctl health check over a Talos cluster",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--ip <ip>", takes: "the node the health check is asked of" },
    {
      said: "--control-plane-ips <csv>",
      takes: "every etcd member's address, which the membership arm weighs",
    },
    { said: "--worker-ips <csv>", takes: "every worker's address, where the cluster has workers" },
    {
      said: "--cluster <name>",
      takes: "the cluster whose talosconfig is read, `main` where none is said",
    },
  ],
  helpNotes: [
    "the check reports on etcd, apid, the kubelet and control-plane readiness, and is what confirms a cluster before a smoke test.",
    "the etcd-membership arm fails unless every member's address stands in `--control-plane-ips`, so a multi-node cluster names them all.",
    "naming no control-plane addresses makes the one node asked the whole control plane, which is right for a single-node cluster.",
    "the talosconfig is read from `<home>/.talos/<cluster>.config`, where `talos-apply` wrote it.",
    "talosctl writes the check's own output to the streams this was called on, so that output is not in the report.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A talosconfig that does not stand refuses the check.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster nothing names is `main`.",
    },
    {
      invariantKind: "departure",
      statement: "The control plane is the node asked where no control-plane address is named.",
    },
    {
      invariantKind: "departure",
      statement: "An address list is read as its comma-separated parts, trimmed.",
    },
    {
      invariantKind: "departure",
      statement: "An empty part of an address list is dropped rather than being an address.",
    },
    {
      invariantKind: "departure",
      statement: "Worker nodes are named to the check only where a worker address is named.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes a node.",
    },
  ],
} as const satisfies Command
