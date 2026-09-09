import type { Command } from "../../../command.page-type.ts"

export const measureChanges = {
  id: "01a080d8-9c11-7e59-b6c0-92e324e70a10",
  pageTypeSlug: "command",
  type: "command",
  slug: "measure-changes",
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
  helpNotes: [
    "a call naming no argument reads the last one run.",
    "a run is one call of a change or one call of an apply.",
    "one run id is minted for each call rather than shared between the two.",
    "the rows are gathered under the change that ran, with an apply gathered under `apply`.",
    "a change that ran no run of what was chosen is not listed at all.",
    "the rows are read from beside the change page and the apply page.",
    "every numbered file of those rows is read rather than the first alone.",
    "a file that would not read is named rather than counting as no runs.",
    "the total counts the distinct runs read rather than the records read.",
    "the total shares the processor time over the distinct runs read.",
    "the total draws its memory as `-`.",
    "a run's processor time is that run's own together with the children that run reaped.",
    "a run's memory is what that run added over the memory resident when the run opened.",
    "a run that forgot no high-water mark is left out of the memory it would otherwise report.",
    "the paths and the refusals are added up rather than shared out over the runs.",
    "changes are ordered by what their runs took on average.",
    "changes taking equal processor time are ordered by name.",
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
  ],
} as const satisfies Command
