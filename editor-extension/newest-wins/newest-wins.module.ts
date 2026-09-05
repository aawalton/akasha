import type { Module } from "../../code-system/modules/module.page-type.ts"

export const newestWins = {
  id: "01a07350-1dd6-7dae-968b-4ba076e8b62b",
  pageTypeSlug: "module",
  slug: "newest-wins",
  definition: "one run at a time, with the newest ask run after the run in flight",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One run is in flight at a time.",
    },
    {
      invariantKind: "departure",
      statement: "An ask arriving mid-run is run once that run ends.",
    },
    {
      invariantKind: "departure",
      statement: "An ask arriving mid-run replaces the ask already waiting.",
    },
    {
      invariantKind: "departure",
      statement:
        "The ask waiting is taken up by the run in flight rather than by the caller that asked.",
    },
    {
      invariantKind: "departure",
      statement: "A caller whose ask is left waiting waits on the run in flight and returns.",
    },
    {
      invariantKind: "departure",
      statement: "A run that throws leaves the ask behind that run to run all the same.",
    },
    {
      invariantKind: "departure",
      statement: "A throw is answered once nothing is left waiting.",
    },
    {
      invariantKind: "departure",
      statement: "Two runs that throw are answered with the first of the two throws.",
    },
    {
      invariantKind: "departure",
      statement: "A caller left waiting is answered with no throw from a run that is not its own.",
    },
    {
      invariantKind: "constraint",
      statement: "Every ask carries a whole picture, so the newest repeats the ones before.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds a timer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows a run's work.",
    },
  ],
} as const satisfies Module
