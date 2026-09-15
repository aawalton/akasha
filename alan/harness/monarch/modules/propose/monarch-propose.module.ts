import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchPropose = {
  id: "01a06867-fdff-7c1a-91f8-4e475fdf3880",
  type: "page-type/module",
  slug: "monarch-propose",
  definition: "the rules run over the whole history and reported on, writing nothing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule is weighed before that rule stands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A command-line rule is weighed alongside the standing rules rather than in place of those rules.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A named rule that does not stand is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal for a named rule lists the rules that do stand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run with no rule at all is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal for a run with no rule names the folder the rules are in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every rule is weighed against every transaction.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Shadowing between rules is visible.",
    },
  ],
} as const satisfies Module
