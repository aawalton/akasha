import type { Command } from "akasha/commands/command.page-type.types.ts"

export const talosApply = {
  id: "01a06809-a024-7ec0-9d74-4fc9c49d1ac0",
  type: "command",
  slug: "talos-apply",
  definition: "the command taking one Talos node from maintenance mode into its cluster",
  code: "ts",
  taking: [
    { said: "<node>", takes: "the node to apply, said as a word rather than after `--node`" },
    { said: "--node <id>", takes: "the node to apply, as the node table names it" },
    { said: "--ip <ip>", takes: "the maintenance-mode address the node answers at" },
    {
      said: "--cluster <name>",
      takes: "the cluster to apply for, where the node's own is not the one meant",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The node's schematic is registered with the Image Factory before the config is generated.",
    },
    {
      invariantKind: "departure",
      statement: "The talosconfig is written under the home at mode 0600.",
    },
    {
      invariantKind: "departure",
      statement: "`talosctl` or `sops` missing from PATH is the machine's fault.",
    },
    {
      invariantKind: "departure",
      statement: "talosctl writes its own progress to the streams the call was made on.",
    },
    {
      invariantKind: "departure",
      statement: "The node is named as a word or after `--node`.",
    },
    {
      invariantKind: "departure",
      statement: "A node named as a word and after `--node` is refused.",
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
      statement:
        "A cluster whose secrets are not there refuses the apply rather than writing those secrets.",
    },
    {
      invariantKind: "departure",
      statement: "The control-plane endpoint is the cluster's VIP where the cluster states a VIP.",
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
  name: "apply",
} as const satisfies Command
