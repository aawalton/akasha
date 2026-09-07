import type { Command } from "../command.page-type.ts"

export const measureChecks = {
  id: "01a0796e-60e0-7966-a168-7960d223be13",
  pageTypeSlug: "command",
  slug: "measure-checks",
  definition: "the command saying what a check's run cost in processor time and memory, by phase",
  code: "ts",
  changeKindSlug: "change-mechanical",
  partSlugs: ["module/check-measuring"],
  taking: [],
  helpNotes: [
    "the runs counted are the ones of the twenty-four hours ending at the moment of asking.",
    "a run exactly twenty-four hours old is counted, and a run older than that is not.",
    "a check no run of that window was judged at is not listed at all.",
    "the window the numbers cover is said beneath the table.",
    "an average is what a phase's runs took together shared out over how many runs there were.",
    "a patch run judges the paths a change carries, and an audit run judges every page.",
    "a run's processor time is that run's own together with the children that run reaped.",
    "a run's memory is what that run added over the memory resident when the run opened.",
    "a run that forgot no high-water mark is left out of the memory it would otherwise report.",
    "that run is counted in the processor time and among the runs its phase holds all the same.",
    "how many runs a phase holds is said before that phase's averages.",
    "a phase no run was judged at is drawn as `-`, which is not an average of zero.",
    "a phase no run was judged at counts `0` runs, which is a count rather than an absence.",
    "checks are ordered by what their patch runs took on average, and no patch run comes last.",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit holds.",
    },
  ],
} as const satisfies Command
