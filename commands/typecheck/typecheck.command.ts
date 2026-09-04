import type { Command } from "../../command-system/commands/command.page-type.ts"

export const typecheck = {
  id: "01a06919-54ac-7a54-b45f-918762988e17",
  pageTypeSlug: "command",
  slug: "typecheck",
  definition:
    "the command saying what the compiler finds in the files named and the files importing them",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--file-path <path>", takes: "a file or folder in the repository the compiler judges" },
    {
      said: "--seeded",
      takes: "a fault put into each file named, in memory alone, to show the run sees the file",
    },
  ],
  helpNotes: [
    "--file-path repeats, so several paths are judged in one call.",
    "named nothing, it refuses — `akasha audit --check typecheck` is what judges the folder.",
    "it judges the files named and every file importing them, and says nothing about the rest of the folder.",
    "a program made of the files named is not the program made of the folder, so a fault standing in the folder can stand outside what this sees.",
    "it runs the check an audit runs, over the files named alone, in seconds and near a gigabyte rather than fifteen minutes and seventeen.",
    "nothing is written — this says what the compiler found and fixes none of it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run reaches no file outside this repository.",
    },
    {
      invariantKind: "departure",
      statement: "A run judges the files named and every file importing those files.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming nothing is refused rather than judging the folder.",
    },
    {
      invariantKind: "departure",
      statement: "A run answers with the files judged rather than with the whole folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file named that the run did not judge refuses the run rather than reading clean.",
    },
    {
      invariantKind: "departure",
      statement: "A seeded run puts a fault into each file named in memory alone.",
    },
    {
      invariantKind: "departure",
      statement: "A seeded run refuses each file named that drew no diagnostic.",
    },
    {
      invariantKind: "departure",
      statement: "What a run finds is said as an audit says the same finding.",
    },
    {
      invariantKind: "departure",
      statement: "A run writes nothing.",
    },
  ],
} as const satisfies Command
