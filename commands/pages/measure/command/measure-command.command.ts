import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureCommand = {
  id: "01a080df-5446-793b-a0e0-ea1f3b757ca8",
  type: "command",
  slug: "measure-command",
  definition: "the command saying what a command's own run cost in processor time and memory",
  code: "ts",
  parts: ["module/command-measuring"],
  taking: [
    { said: "--last <count>", takes: "how many of the most recent runs the numbers cover" },
    {
      said: "--last <count>{m|h|d}",
      takes: "the period the numbers cover ending at the moment of asking",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming no argument reads the last one run.",
    },
    {
      invariantKind: "departure",
      statement: "A run is one call of one command, measured around the whole call.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are read from beside the page of every command the tree carries.",
    },
    {
      invariantKind: "departure",
      statement: "Every numbered file of those rows is read rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "A file that would not read is named rather than counting as no runs.",
    },
    {
      invariantKind: "departure",
      statement: "A change run and an apply run are counted apart from a command's own run.",
    },
    {
      invariantKind: "departure",
      statement: "A command holding no run of what was chosen is not listed at all.",
    },
    {
      invariantKind: "departure",
      statement: "The total counts the distinct runs read rather than the records read.",
    },
    {
      invariantKind: "departure",
      statement: "The total shares the processor time over the distinct runs read.",
    },
    {
      invariantKind: "departure",
      statement: "The total draws its memory as `-`.",
    },
    {
      invariantKind: "departure",
      statement: "A run's processor time is that run's own together with the children it reaped.",
    },
    {
      invariantKind: "departure",
      statement: "A run's memory is what that run added over the memory resident when it opened.",
    },
    {
      invariantKind: "departure",
      statement: "A run that noted no high-water mark is left out of the memory reported.",
    },
    {
      invariantKind: "departure",
      statement: "This command's own run is recorded as every other command's run is.",
    },
    {
      invariantKind: "departure",
      statement: "Commands are ordered by what their runs took on average.",
    },
    {
      invariantKind: "departure",
      statement: "Commands taking equal processor time are ordered by name.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
    {
      invariantKind: "departure",
      statement: "An argument this command does not take is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A row appended while this reads is read or passed over rather than refusing.",
    },
  ],
  name: "command",
} as const satisfies Command
