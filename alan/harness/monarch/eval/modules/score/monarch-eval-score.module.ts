import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchEvalScore = {
  id: "01a06868-1eff-7772-8b1a-2c5a4d3dd331",
  type: "page-type/module",
  slug: "monarch-eval-score",
  definition: "a run file read as how far an agent's categories agree with the household's own",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run is scored from its file rather than by being run again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Agreement is against the category standing on the row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The category standing on the row is the only answer there is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A proposal naming a category that was not offered is counted as invalid rather than as wrong.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A drawn row the agent said nothing about is scored as no answer rather than dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every figure is reported inside the population that figure sits in rather than on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The figures are broken out by stratum and by confidence.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Rows the agent was confident and wrong about are shown with their reasons.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement:
        "The run file is taken as its type through `unknown` rather than read field by field.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "No single assertion carries an untyped object to an interface declaring no index signature.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a model.",
    },
  ],
} as const satisfies Module
