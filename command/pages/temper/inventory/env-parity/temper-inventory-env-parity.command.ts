import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryEnvParity = {
  id: "01a09ced-db9b-74a0-81d3-f99a19727d8a",
  type: "page-type/command",
  slug: "temper-inventory-env-parity",
  definition: "whether the env `explain` runs in and the env `plan` runs in decide an item alike",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The two read here are the env `explain` runs in and the env `plan` runs in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each env is built from what the run it belongs to builds that env from.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An env built here from less than its run hands it compares something else.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Neither env read here is the addon's, so agreement is no sign the addon agrees.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two envs reaching one action by two destinations disagree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every item in every bag of every location is ruled on rather than a sample.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A disagreement is gathered by the item it is about rather than by the stack.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run finding nothing says the two agree rather than answering empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that found a disagreement answers a code other than zero, in either form.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What that code says is what was found rather than what shape the answer took.",
    },
  ],
  name: "env-parity",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/inventory-path" },
    { argument: "argument/characters-path" },
  ],
} as const satisfies Command
