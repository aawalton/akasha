import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchEvalScore = {
  id: "01a06868-1eff-7772-8b1a-2c5a4d3dd331",
  pageTypeSlug: "module",
  slug: "monarch-eval-score",
  definition: "a run file read as how far an agent's categories agree with the household's own",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run is scored from its file rather than by being run again.",
    },
    {
      invariantKind: "departure",
      statement:
        "Agreement is against the category standing on the row, which is the only answer there is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A proposal naming a category that was not offered is counted as invalid rather than as wrong.",
    },
    {
      invariantKind: "departure",
      statement:
        "A drawn row the agent said nothing about is scored as no answer rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every figure is reported inside the population it sits in rather than on its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "The figures are broken out by stratum and by confidence, because a rate over all of them together says little.",
    },
    {
      invariantKind: "departure",
      statement:
        "Rows the agent was confident and wrong about are shown with their reasons, because those are what a reader learns from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a model.",
    },
  ],
} as const satisfies Module
