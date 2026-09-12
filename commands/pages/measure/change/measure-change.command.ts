import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureChange = {
  id: "01a080d8-9c11-7e59-b6c0-92e324e70a10",
  type: "command",
  slug: "measure-change",
  definition:
    "the command saying what a change run and an apply run cost in processor time and memory",
  code: "ts",
  changeKind: "change-mechanical",
  parts: ["module/change-measuring"],
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
      statement: "A run is one call of a change or one call of an apply.",
    },
    {
      invariantKind: "departure",
      statement: "One run id is minted for each call rather than shared between the two.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are gathered under the change that ran, and an apply under `apply`.",
    },
    {
      invariantKind: "departure",
      statement: "A change that ran no run of what was chosen is not listed at all.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are read from beside the change page and the apply page.",
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
      statement: "The paths and the refusals are added up rather than shared out over the runs.",
    },
    {
      invariantKind: "departure",
      statement: "Changes are ordered by what their runs took on average.",
    },
    {
      invariantKind: "departure",
      statement: "Changes taking equal processor time are ordered by name.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
    {
      invariantKind: "departure",
      statement: "An argument this command does not take is refused.",
    },
  ],
  name: "change",
} as const satisfies Command
