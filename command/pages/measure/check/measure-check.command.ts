import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureCheck = {
  id: "01a0796e-60e0-7966-a168-7960d223be13",
  type: "page-type/command",
  slug: "measure-check",
  definition: "the command saying what a check's run cost in processor time and memory",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no argument reads the check runs of the past twenty-four hours.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check's runs are kept in two groups, and this command reads the check group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The check group holds the change runs, the worktree runs and the deploy runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row of a check's check logs is a check run whatever phase that row spells.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The entries beside a check are read too, and hold the history up to today.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entries row names no group, and the phase that row spells places it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That placing is the best the entries admit rather than what the writer meant.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row the logs already hold is not counted again from the entries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One set of columns is drawn, holding the check runs alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check holding no check run is not listed at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run is one change judged by every check that change reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One run id is minted for each change judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every check judged over that change carries that run id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record carrying no run id belongs to no run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record belonging to no run counts nowhere where runs were counted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A period counts every record stamped within that period whether a run id is there or not.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check no run of what was chosen judged is not listed at all.",
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
      statement: "The total for one run is exactly what that run took.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The total draws its average memory as `-`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A peak of memory adds to no other peak.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An average is what the runs took together shared out over how many runs there were.",
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
      statement: "That run is counted in the processor time all the same.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That run is counted among the runs a check holds all the same.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How many runs a check holds is said before that check's averages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Checks are ordered by what their runs took on average.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Checks taking equal processor time are ordered by name.",
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
      statement: "The ceilings drawn are the ones a check's check group states.",
    },
  ],
  name: "check",
  arguments: [{ argument: "argument/run-window" }],
} as const satisfies Command
