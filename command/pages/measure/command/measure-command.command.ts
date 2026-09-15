import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureCommand = {
  id: "01a080df-5446-793b-a0e0-ea1f3b757ca8",
  type: "command",
  slug: "measure-command",
  definition: "the command saying what a command's own run cost in processor time and memory",
  code: "ts",
  test: "ts",
  parts: ["module/command-measuring"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no argument reads the runs of the past twenty-four hours.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run is one call of one command, measured around the whole call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows are read from beside the page of every command the tree carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every numbered file of those rows is read rather than the first alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that would not read is named rather than counting as no runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change run and an apply run are counted apart from a command's own run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command holding no run of what was chosen is not listed at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The total counts the distinct runs read rather than the records read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The total shares the processor time over the distinct runs read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The total draws its average memory as `-`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run's processor time is that run's own together with the children it reaped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run's memory is what that run added over the memory resident when it opened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that noted no high-water mark is left out of the memory reported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This command's own run is recorded as every other command's run is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Commands are ordered by what their runs took on average.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Commands taking equal processor time are ordered by name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run writes no value the commit has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument this command does not take is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row appended while this reads is read or passed over rather than refusing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ceiling drawn is the wall-clock seconds a command's page allows.",
    },
  ],
  name: "command",
  arguments: [{ argument: "argument/run-window" }],
} as const satisfies Command
