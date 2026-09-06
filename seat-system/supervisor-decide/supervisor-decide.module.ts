import type { Module } from "@akasha/code/module"

export const supervisorDecide = {
  id: "01a06938-eca6-7c73-bee3-f66766ef7dfc",
  pageTypeSlug: "module",
  slug: "supervisor-decide",
  definition: "the decisions a supervisor asks for, read off JSON on stdin and answered as JSON",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A caller asking for a decision imports and calls this module rather than running that module.",
    },
    {
      invariantKind: "departure",
      statement: "The whole call is the JSON on stdin.",
    },
    {
      invariantKind: "departure",
      statement: "An argument given to this module is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A payload asking nothing is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A payload naming a decision this module does not make is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A notice a decision needs and cannot find is refused rather than sent empty.",
    },
    {
      invariantKind: "departure",
      statement: "The notices are rendered by the compose module beside this module.",
    },
  ],
} as const satisfies Module
