import type { Command } from "@akasha/command-system/command"

export const talosApply = {
  id: "01a06809-a024-7ec0-9d74-4fc9c49d1ac0",
  pageTypeSlug: "command",
  slug: "talos-apply",
  definition: "the command taking one Talos node from maintenance mode into its cluster",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "<node>", takes: "the node to apply, said as a word rather than after `--node`" },
    { said: "--node <id>", takes: "the node to apply, as the node table names it" },
    { said: "--ip <ip>", takes: "the maintenance-mode address the node answers at" },
    {
      said: "--cluster <name>",
      takes: "the cluster to apply for, where the node's own is not the one meant",
    },
  ],
  helpNotes: [
    "the schematic is registered, the machine-config patch is built, the secrets are decrypted, and the config is generated and applied.",
    "the control-plane endpoint is the cluster's VIP where the cluster states one, so issuer and audience match across its members.",
    "the machine type follows the node's role, so a worker takes worker.yaml and every other role takes controlplane.yaml.",
    "the talosconfig generated here is written under the home directory at mode 0600, and the later talos acts read it there.",
    "talosctl and sops must stand on PATH, and the cluster's secrets must have been generated already.",
    "talosctl writes its own progress to the streams this was called on, so that output is not in the report.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The node is named as a word or after `--node`, and naming both is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A node the node table does not name is the caller's mistake.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster nothing names is the node's own cluster.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster whose secrets do not stand refuses the apply rather than writing them.",
    },
    {
      invariantKind: "departure",
      statement: "The control-plane endpoint is the cluster's VIP where the cluster states one.",
    },
    {
      invariantKind: "departure",
      statement: "The machine type is controlplane for every role but worker.",
    },
    {
      invariantKind: "departure",
      statement: "The talosconfig is written before the config is applied.",
    },
    {
      invariantKind: "departure",
      statement: "The decrypted secrets are taken away however the apply ends.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here undoes an apply.",
    },
  ],
} as const satisfies Command
