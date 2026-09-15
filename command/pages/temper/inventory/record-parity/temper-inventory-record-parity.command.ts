import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryRecordParity = {
  id: "01a09f61-ca3e-75ea-9e65-23af74517db1",
  type: "command",
  slug: "temper-inventory-record-parity",
  definition: "whether the verdict the addon recorded on an item is what a fresh reading reaches",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The two compared here are the verdict the addon recorded and a fresh reading of that item.",
    },
    {
      invariantKind: "departure",
      statement: "Every item carrying a record is ruled on rather than a sample.",
    },
    {
      invariantKind: "departure",
      statement: "A rule index is compared only where both sides name an ordered rule.",
    },
    {
      invariantKind: "departure",
      statement: "A disagreement is gathered by the item it is about rather than by the stack.",
    },
    {
      invariantKind: "departure",
      statement:
        "How much of what is held carries a record is counted from the records present and said in every run.",
    },
    {
      invariantKind: "absence",
      statement:
        "An item carrying no record is out of coverage, and is counted apart from every disagreement.",
    },
    {
      invariantKind: "absence",
      statement:
        "A bag the addon's run never resolves carries no record, so agreement is no sign about that bag.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A record is of the run that last resolved the slot, and a rule changed since then disagrees.",
    },
    {
      invariantKind: "absence",
      statement:
        "No claim the addon threads across its run is threaded here, so an item a claim placed may disagree.",
    },
    {
      invariantKind: "departure",
      statement: "A run finding nothing says the two agree rather than answering empty.",
    },
    {
      invariantKind: "departure",
      statement: "A run that found a disagreement answers a code other than zero, in either form.",
    },
    {
      invariantKind: "departure",
      statement: "What that code says is what was found rather than what shape the answer took.",
    },
  ],
  name: "record-parity",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/inventory-path" },
    { argument: "argument/characters-path" },
  ],
} as const satisfies Command
