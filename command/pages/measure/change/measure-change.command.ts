import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureChange = {
  id: "01a080d8-9c11-7e59-b6c0-92e324e70a10",
  type: "page-type/command",
  slug: "measure-change",
  definition:
    "the command saying what a change run and an apply run cost in processor time and memory",
  code: "ts",
  test: "ts",
  parts: ["module/change-measuring"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no argument reads the runs of the past twenty-four hours.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run is one call of a change or one call of an apply.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One run id is minted for each call rather than shared between the two.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows are gathered under the change that ran, and an apply under `apply`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change that ran no run of what was chosen is not listed at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows are read from beside the change page and the apply page.",
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
      statement: "Changes are ordered by what their runs took on average.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Changes taking equal processor time are ordered by name.",
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
      statement: "The ceilings drawn are the ones the page of the change that ran states.",
    },
  ],
  name: "change",
  arguments: [{ argument: "argument/run-window" }],
} as const satisfies Command
