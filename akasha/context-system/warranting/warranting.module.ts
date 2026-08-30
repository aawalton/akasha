import type { Module } from "../../code-system/module/module.page-type.ts"

export const warranting = {
  id: "01a04ee0-3078-7000-9069-e5db5da797ad",
  pageTypeSlug: "module",
  slug: "warranting",
  definition: "the readings a change owes, and which of them the record does not answer for",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every path a change names is asked what it warrants, and passes by answering, never by not being asked.",
    },
    {
      invariantKind: "departure",
      statement: "A reading answers for a warrant by object id alone, never by when it was read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A warrant carries why the reading is owed, so a refusal says what is owed rather than only that something is.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the read that would answer the warrant, ready to run.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call charged to no agent is refused whole, and said to be impossible rather than merely wrong.",
    },
    {
      invariantKind: "departure",
      statement:
        "Warrants stand over an authored change alone. A change the machine made carries no judgement, so no reading informs it.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here writes, commits or records; it is asked and it answers.",
    },
    {
      invariantKind: "departure",
      statement:
        "A warrant is what the change owes, never what a warranted file would owe were it changed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read is handed the paths it names, and after each of them what the warrants running on read name for it.",
    },
    {
      invariantKind: "departure",
      statement: "A path stands once in what a read is handed, in the place it first stood.",
    },
    {
      invariantKind: "departure",
      statement:
        "Warrants that cannot be worked out hand back the paths handed in, so a read answers what it can.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing is changed that its writer has not read.",
    },
  ],
} as const satisfies Module
