import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureCheck = {
  id: "01a0796e-60e0-7966-a168-7960d223be13",
  type: "command",
  slug: "measure-check",
  definition: "the command saying what a check's run cost in processor time and memory",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming no argument reads the last one check run.",
    },
    {
      invariantKind: "departure",
      statement: "A check's runs are kept in two groups, and this command reads the check group.",
    },
    {
      invariantKind: "departure",
      statement: "The check group holds the change runs, the worktree runs and the deploy runs.",
    },
    {
      invariantKind: "departure",
      statement: "A row of a check's check logs is a check run whatever phase that row spells.",
    },
    {
      invariantKind: "departure",
      statement: "The entries beside a check are read too, and hold the history up to today.",
    },
    {
      invariantKind: "departure",
      statement: "An entries row names no group, and the phase that row spells places it.",
    },
    {
      invariantKind: "departure",
      statement: "That placing is the best the entries admit rather than what the writer meant.",
    },
    {
      invariantKind: "departure",
      statement: "A row the logs already hold is not counted again from the entries.",
    },
    {
      invariantKind: "departure",
      statement: "One set of columns is drawn, holding the check runs alone.",
    },
    {
      invariantKind: "departure",
      statement: "A check holding no check run is not listed at all.",
    },
    {
      invariantKind: "departure",
      statement: "A run is one change judged by every check that change reached.",
    },
    {
      invariantKind: "departure",
      statement: "One run id is minted for each change judged.",
    },
    {
      invariantKind: "departure",
      statement: "Every check judged over that change carries that run id.",
    },
    {
      invariantKind: "departure",
      statement: "A record carrying no run id belongs to no run.",
    },
    {
      invariantKind: "departure",
      statement: "A record belonging to no run counts nowhere where runs were counted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A period counts every record stamped within that period whether a run id is there or not.",
    },
    {
      invariantKind: "departure",
      statement: "A check no run of what was chosen judged is not listed at all.",
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
      statement: "The total for one run is exactly what that run took.",
    },
    {
      invariantKind: "departure",
      statement: "The total draws its memory as `-`.",
    },
    {
      invariantKind: "departure",
      statement: "A peak of memory adds to no other peak.",
    },
    {
      invariantKind: "departure",
      statement:
        "An average is what the runs took together shared out over how many runs there were.",
    },
    {
      invariantKind: "departure",
      statement: "A change run judges the paths that change carries.",
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
      statement: "That run is counted in the processor time all the same.",
    },
    {
      invariantKind: "departure",
      statement: "That run is counted among the runs a check holds all the same.",
    },
    {
      invariantKind: "departure",
      statement: "How many runs a check holds is said before that check's averages.",
    },
    {
      invariantKind: "departure",
      statement: "The paths and the refusals are added up rather than shared out over the runs.",
    },
    {
      invariantKind: "departure",
      statement: "The total counts a run's paths once.",
    },
    {
      invariantKind: "departure",
      statement: "The total's refusals are the refusals of every record read added together.",
    },
    {
      invariantKind: "departure",
      statement: "Checks are ordered by what their runs took on average.",
    },
    {
      invariantKind: "departure",
      statement: "Checks taking equal processor time are ordered by name.",
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
  name: "check",
  arguments: [{ argument: "argument/run-window" }],
} as const satisfies Command
