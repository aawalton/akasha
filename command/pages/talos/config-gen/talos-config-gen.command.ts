import type { Command } from "akasha/command/command.page-type.types.ts"

export const talosConfigGen = {
  id: "01a06809-a024-740f-b1cb-f3271877bd51",
  type: "page-type/command",
  slug: "talos-config-gen",
  definition: "the command writing one Talos node's machine-config overlay documents",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The documents are the node's machine-config patch and then its storage documents.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A volume the node states is one user volume document.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A node stating an ephemeral disk has an ephemeral volume document as well.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The schematic id the install image points at is read from `TALOS_SCHEMATIC_ID`.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the cluster's PKI.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The node is named as a word or after `--node`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Naming the node twice is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A node the node table does not name is the caller's mistake.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cluster is the node's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The registry CA is read only where the cluster names a registry host.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A schematic id nothing states is a placeholder rather than a refusal.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "The documents are reported where no output file is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a node.",
    },
  ],
  name: "config-gen",
  arguments: [
    { argument: "argument/node", required: true, saidAs: "flag-or-word" },
    { argument: "argument/output" },
  ],
} as const satisfies Command
