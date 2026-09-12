import type { Command } from "akasha/commands/command.page-type.types.ts"

export const talosConfigGen = {
  id: "01a06809-a024-740f-b1cb-f3271877bd51",
  type: "command",
  slug: "talos-config-gen",
  definition: "the command writing one Talos node's machine-config overlay documents",
  code: "ts",
  taking: [
    { said: "<node>", takes: "the node to write for, said as a word rather than after `--node`" },
    { said: "--node <id>", takes: "the node to write for, as the node table names it" },
    {
      said: "--output <path>",
      takes: "the file to write to, where the documents are not reported",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The documents are the node's machine-config patch and then its storage documents.",
    },
    {
      invariantKind: "departure",
      statement: "A volume the node states is one user volume document.",
    },
    {
      invariantKind: "departure",
      statement: "A node stating an ephemeral disk has an ephemeral volume document as well.",
    },
    {
      invariantKind: "departure",
      statement: "The schematic id the install image points at is read from `TALOS_SCHEMATIC_ID`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the cluster's PKI.",
    },
    {
      invariantKind: "departure",
      statement: "The node is named as a word or after `--node`.",
    },
    {
      invariantKind: "departure",
      statement: "Naming the node twice is refused.",
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
      statement: "The documents are reported where no output file is named.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a node.",
    },
  ],
  name: "config-gen",
  arguments: [
    { argument: "argument/node", required: true, saidAs: "flag-or-word" },
    { argument: "argument/output" },
  ],
} as const satisfies Command
