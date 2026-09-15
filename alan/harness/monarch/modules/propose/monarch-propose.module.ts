import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchPropose = {
  id: "01a06867-fdff-7c1a-91f8-4e475fdf3880",
  type: "module",
  slug: "monarch-propose",
  definition: "the rules run over the whole history and reported on, writing nothing",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing here is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule is weighed before that rule stands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A command-line rule is weighed alongside the standing rules rather than in place of those rules.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A named rule that does not stand is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal for a named rule lists the rules that do stand.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run with no rule at all is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal for a run with no rule names the folder the rules are in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every rule is weighed against every transaction.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Shadowing between rules is visible.",
    },
  ],
} as const satisfies Module
