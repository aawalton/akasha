import type { Command } from "@akasha/command-system/command"

export const talosConfigGen = {
  id: "01a06809-a024-740f-b1cb-f3271877bd51",
  pageTypeSlug: "command",
  slug: "talos-config-gen",
  definition: "the command writing one Talos node's machine-config overlay documents",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "<node>", takes: "the node to write for, said as a word rather than after `--node`" },
    { said: "--node <id>", takes: "the node to write for, as the node table names it" },
    {
      said: "--output <path>",
      takes: "the file to write to, where the documents are not reported",
    },
  ],
  helpNotes: [
    "the documents are the strategic-merge patch laid over what `talosctl gen config` makes, followed by the node's storage documents.",
    "the patch carries the hostname, install disk and image, control-plane VIP, registries and CA trust, kubelet mounts, etcd quota, subnets and labels.",
    "the storage documents are one user volume per re-homed store and an ephemeral volume where the node states a separate etcd disk.",
    "the cluster PKI is not here: it stands SOPS-encrypted beside the cluster's page and `talos-secrets-gen` writes it.",
    "`TALOS_SCHEMATIC_ID` names the Image Factory schematic the install image points at, and a placeholder stands where it is unset.",
    "the placeholder is enough for a golden test and no real apply takes it.",
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
      statement: "The cluster is the node's own.",
    },
    {
      invariantKind: "departure",
      statement: "The registry CA is read only where the cluster names a registry host.",
    },
    {
      invariantKind: "departure",
      statement: "A schematic id nothing states is a placeholder rather than a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A path named for the output is read against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "The documents are reported where no output file is named.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a node.",
    },
  ],
} as const satisfies Command
