import type { Command } from "akasha/command/command.page-type.types.ts"

export const talosKubeconfig = {
  id: "01a06810-1f0b-744f-aff5-3618b540bf6c",
  type: "command",
  slug: "talos-kubeconfig",
  definition: "the command fetching a Talos cluster's kubeconfig onto the workstation",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A talosconfig that is not there refuses the fetch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The talosconfig read sits at `<home>/.talos/<cluster>.config`, where `akasha talos apply` writes it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cluster nothing names is `main`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A destination nothing names is `<home>/.kube/talos-<cluster>.yaml`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder above the destination is made before the fetch runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fetch that threw after making that folder names the folder it made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder that was already there is named nowhere, because nothing made it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fetch that threw carries the kind of fault the throw names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kubeconfig already at the destination is written over rather than merged into.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "invariant-kind/absence",
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
