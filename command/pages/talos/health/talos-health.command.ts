import type { Command } from "akasha/command/command.page-type.types.ts"

export const talosHealth = {
  id: "01a06810-1f0b-7aac-ab38-a6658f91ee11",
  type: "command",
  slug: "talos-health",
  definition: "the command running the talosctl health check over a Talos cluster",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A talosconfig that is not there refuses the check.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The talosconfig read sits at `<home>/.talos/<cluster>.config`, where `akasha talos apply` writes it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "talosctl writes the check's own output to the streams the call was made on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cluster nothing names is `main`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The control plane is the node asked where no control-plane address is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address list is read as its trimmed comma-separated parts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty part of an address list is dropped rather than being an address.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Worker nodes are named to the check only where a worker address is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here changes a node.",
    },
  ],
  name: "health",
  arguments: [
    { argument: "argument/cluster" },
    { argument: "argument/ip", required: true },
    { argument: "argument/control-plane-ips" },
    { argument: "argument/worker-ips" },
  ],
} as const satisfies Command
