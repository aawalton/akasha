import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureAudit = {
  id: "01a08c17-afc0-7dd8-8fbe-b625407e7a33",
  type: "page-type/command",
  slug: "measure-audit",
  definition: "the command saying what a check's audit run cost in processor time and memory",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no argument reads the audit runs of the past twenty-four hours.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check's runs are kept in two groups, and this command reads the audit group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row of a check's audit logs is an audit run whatever phase that row spells.",
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
      statement: "One set of columns is drawn, holding the audit runs alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check holding no audit run is not listed at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit run judges every page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One run id is minted for each audit judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every check judged over that audit carries that run id.",
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
      statement: "The ceilings drawn are the ones a check's audit group states.",
    },
  ],
  name: "audit",
  arguments: [{ argument: "argument/run-window" }],
} as const satisfies Command
