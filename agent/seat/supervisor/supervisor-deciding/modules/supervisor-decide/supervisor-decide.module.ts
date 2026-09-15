import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorDecide = {
  id: "01a06938-eca6-7c73-bee3-f66766ef7dfc",
  type: "page-type/module",
  slug: "supervisor-decide",
  definition: "the decisions a supervisor asks for, read off JSON on stdin and answered as JSON",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller asking for a decision imports and calls this module rather than running that module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The whole call is the JSON on stdin.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument given to this module is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A payload asking nothing is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A payload naming a decision this module does not make is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notice a decision needs and cannot find is refused rather than sent empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal names the module owning the notice by slug rather than by path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The notices are rendered by the compose module beside this module.",
    },
  ],
} as const satisfies Module
