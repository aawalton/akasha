import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const newestWins = {
  id: "01a07350-1dd6-7dae-968b-4ba076e8b62b",
  type: "module",
  slug: "newest-wins",
  definition: "one run at a time, with the newest ask run after the run in flight",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One run is in flight at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ask arriving mid-run is run once that run ends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ask arriving mid-run replaces the ask already waiting.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The ask waiting is taken up by the run in flight rather than by the caller that asked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller whose ask is left waiting waits on the run in flight and returns.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that throws leaves the ask behind that run to run all the same.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A throw is answered once nothing is left waiting.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two runs that throw are answered with the first of the two throws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller left waiting is answered with no throw from a run that is not its own.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Every ask has a whole picture.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The newest ask repeats every earlier ask.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here has a timer.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows a run's work.",
    },
  ],
} as const satisfies Module
