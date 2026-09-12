import type { Command } from "akasha/commands/command.page-type.types.ts"

export const talosKubeconfig = {
  id: "01a06810-1f0b-744f-aff5-3618b540bf6c",
  type: "command",
  slug: "talos-kubeconfig",
  definition: "the command fetching a Talos cluster's kubeconfig onto the workstation",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A talosconfig that is not there refuses the fetch.",
    },
    {
      invariantKind: "departure",
      statement:
        "The talosconfig read sits at `<home>/.talos/<cluster>.config`, where `akasha talos apply` writes it.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster nothing names is `main`.",
    },
    {
      invariantKind: "departure",
      statement: "A destination nothing names is `<home>/.kube/talos-<cluster>.yaml`.",
    },
    {
      invariantKind: "departure",
      statement: "The folder above the destination is made before the fetch runs.",
    },
    {
      invariantKind: "departure",
      statement: "A kubeconfig already at the destination is written over rather than merged into.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the kubeconfig k3s is reached through.",
    },
  ],
  name: "kubeconfig",
  arguments: [
    { argument: "argument/cluster" },
    { argument: "argument/ip", required: true },
    { argument: "argument/output" },
  ],
} as const satisfies Command
