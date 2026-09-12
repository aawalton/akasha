import type { Command } from "akasha/commands/command.page-type.types.ts"

export const indexRefresh = {
  id: "01a04de1-13fa-7331-979e-d443758eefad",
  type: "command",
  slug: "index-refresh",
  definition: "the command repairing the index against the pages the repository has",
  code: "ts",
  test: "ts",
  timeout: 600,
  taking: [{ said: "--dry-run", takes: "say what the repair would change and write nothing" }],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A refresh runs no check.",
    },
    {
      invariantKind: "departure",
      statement: "The index is brought level with the repository as the repository is.",
    },
    {
      invariantKind: "departure",
      statement: "The commit the report names is read from HEAD as the repair opens.",
    },
    {
      invariantKind: "departure",
      statement: "The index is repaired in place.",
    },
    {
      invariantKind: "departure",
      statement: "The index is repaired file by file.",
    },
    {
      invariantKind: "departure",
      statement: "The landing lock is held from reading HEAD to the last file written.",
    },
    {
      invariantKind: "departure",
      statement: "A flag belonging to a command that writes is refused rather than ignored.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` says the change the repair would make and writes no file.",
    },
    {
      invariantKind: "departure",
      statement: "An entry that would not file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh takes away every path under the index that no entry names.",
    },
    {
      invariantKind: "departure",
      statement: "The report names the files the index differed in as well as counting the files.",
    },
    {
      invariantKind: "departure",
      statement: "The report counts the files under each index the difference falls in.",
    },
    {
      invariantKind: "absence",
      statement: "A refresh writes nothing tracked and makes no commit.",
    },
    {
      invariantKind: "gap",
      statement: "A body a hand is still writing is taken as the body stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refresh that stopped part way is refused naming each index it wrote into and how many files.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names the file the refresh had in hand when the refresh stopped.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refresh that stopped before it wrote an index file says the index is as it was.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "departure",
      statement: "A root holding no domain page is a fault of the data.",
    },
    {
      invariantKind: "departure",
      statement: "An entry that would not file is a fault of the data.",
    },
    {
      invariantKind: "departure",
      statement: "A commit that would not be read is an operational fault.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh that stopped part way is an operational fault.",
    },
  ],
  name: "refresh",
  arguments: [{ argument: "argument/dry-run" }],
} as const satisfies Command
