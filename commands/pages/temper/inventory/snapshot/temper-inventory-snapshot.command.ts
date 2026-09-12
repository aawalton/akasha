import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventorySnapshot = {
  id: "01a0603c-c1d9-7ef8-acb9-f19095076d6e",
  type: "command",
  slug: "temper-inventory-snapshot",
  definition: "the command giving back a stored holdings snapshot as one whole record",
  code: "ts",
  taking: [{ said: "--json", takes: "give the record on one line rather than indented" }],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A snapshot's whole record sits in one data file beside its page.",
    },
    {
      invariantKind: "departure",
      statement: "The pieces a reading arrived in were rejoined before the snapshot landed.",
    },
    {
      invariantKind: "departure",
      statement: "A snapshot is reached by its page id or by its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming a snapshot and asking for the newest at once is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The newest snapshot is the snapshot whose reading was taken most recently.",
    },
    {
      invariantKind: "departure",
      statement: "A snapshot with no data file refuses the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the page store over the network.",
    },
    {
      invariantKind: "stopgap",
      statement: "The record is answered as JSON whether or not `--json` is said.",
    },
    {
      invariantKind: "stopgap",
      statement: "So `--json` here takes the indenting off rather than choosing JSON.",
    },
  ],
  name: "snapshot",
  arguments: [
    { argument: "argument/latest" },
    { argument: "argument/snapshot", saidAs: "word", notWith: ["argument/latest"] },
    { argument: "argument/output" },
  ],
} as const satisfies Command
