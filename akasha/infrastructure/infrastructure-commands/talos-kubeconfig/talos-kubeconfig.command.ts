import type { Command } from "@akasha/command-system/command"

export const talosKubeconfig = {
  id: "01a06810-1f0b-744f-aff5-3618b540bf6c",
  pageTypeSlug: "command",
  slug: "talos-kubeconfig",
  definition: "the command fetching a Talos cluster's kubeconfig onto the workstation",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "--ip <ip>",
      takes: "the node the kubeconfig is asked of, a control-plane node for choice",
    },
    {
      said: "--cluster <name>",
      takes: "the cluster to fetch for, `main` where none is said",
    },
    { said: "--output <path>", takes: "the file to write to, in place of the one under the home" },
  ],
  helpNotes: [
    "the default destination is `<home>/.kube/talos-<cluster>.yaml`, and the folder above it is made where it is missing.",
    "Talos answers at a cluster endpoint of its own, apart from the k3s kubeconfig, so the two are kept in separate files.",
    "the talosconfig is read from `<home>/.talos/<cluster>.config`, where `talos-apply` wrote it.",
    "an existing file at the destination is written over rather than merged into.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A talosconfig that does not stand refuses the fetch.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster nothing names is `main`.",
    },
    {
      invariantKind: "departure",
      statement: "A destination nothing names is the cluster's own file under the home.",
    },
    {
      invariantKind: "departure",
      statement: "A path named for the output is read against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "The folder above the destination is made before the fetch runs.",
    },
    {
      invariantKind: "departure",
      statement: "A kubeconfig standing at the destination is written over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the kubeconfig k3s is reached through.",
    },
  ],
} as const satisfies Command
