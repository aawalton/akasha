import type { Command } from "../../../command.page-type.ts"

export const measureCommands = {
  id: "01a080df-5446-793b-a0e0-ea1f3b757ca8",
  pageTypeSlug: "command",
  type: "command",
  slug: "measure-commands",
  definition: "the command saying what a command's own run cost in processor time and memory",
  code: "ts",
  changeKind: "change-mechanical",
  parts: ["module/command-measuring"],
  taking: [
    { said: "--last <count>", takes: "how many of the most recent runs the numbers cover" },
    {
      said: "--last <count>{m|h|d}",
      takes: "the period the numbers cover ending at the moment of asking",
    },
  ],
  helpNotes: [
    "a call naming no argument reads the last one run.",
    "a run is one call of one command, measured around the whole call.",
    "the rows are read from beside the page of every command the tree carries.",
    "every numbered file of those rows is read rather than the first alone.",
    "a file that would not read is named rather than counting as no runs.",
    "a change run and an apply run are measured apart, and `akasha measure changes` reads those.",
    "a command holding no run of what was chosen is not listed at all.",
    "the total counts the distinct runs read rather than the records read.",
    "the total shares the processor time over the distinct runs read.",
    "the total draws its memory as `-`.",
    "a run's processor time is that run's own together with the children that run reaped.",
    "a run's memory is what that run added over the memory resident when the run opened.",
    "a run that forgot no high-water mark is left out of the memory it would otherwise report.",
    "this command's own run is recorded as every other command's run is.",
    "commands are ordered by what their runs took on average.",
    "commands taking equal processor time are ordered by name.",
  ],
  invariants: [
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
} as const satisfies Command
