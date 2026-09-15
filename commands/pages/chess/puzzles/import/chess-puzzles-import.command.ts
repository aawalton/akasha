import type { Command } from "akasha/command/command.page-type.types.ts"

export const chessPuzzlesImport = {
  id: "01a0a054-c910-7cde-b634-a0f85f3d49a6",
  type: "command",
  slug: "chess-puzzles-import",
  definition: "the command streaming the Lichess puzzle database into the rows of a puzzle set",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The database is read a batch at a time, and each batch becomes rows.",
    },
    {
      invariantKind: "departure",
      statement: "A row carries an id minted when that row is written.",
    },
    {
      invariantKind: "absence",
      statement: "A puzzle nobody has answered is written with no answer.",
    },
    {
      invariantKind: "departure",
      statement: "A run writes the set again, so an answer recorded before is not kept.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no limit takes the count the ingest holds.",
    },
    {
      invariantKind: "departure",
      statement: "A limit under one refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A page is written through the change working out what kind of path it is.",
    },
    {
      invariantKind: "departure",
      statement: "A file the set no longer fills is taken away in the same landing.",
    },
    {
      invariantKind: "departure",
      statement: "The writing the rows go through is handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A run that read before it threw says in its refusal what that run had read.",
    },
    {
      invariantKind: "absence",
      statement: "No test here reaches the puzzle database.",
    },
  ],
  name: "import",
  arguments: [{ argument: "argument/json" }, { argument: "argument/limit" }],
} as const satisfies Command
