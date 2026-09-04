import type { Module } from "@akasha/code-system/module"

export const supervisorDecide = {
  id: "01a06938-eca6-7c73-bee3-f66766ef7dfc",
  pageTypeSlug: "module",
  slug: "supervisor-decide",
  definition: "the decisions a supervisor asks for, read off JSON on stdin and answered as JSON",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This is run as its own program so a supervisor can kill it at a ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "The whole call is the JSON on stdin, and an argument is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A payload asking nothing, or naming a decision this does not make, is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A notice a decision needs and cannot find is refused rather than sent empty.",
    },
    {
      invariantKind: "departure",
      statement: "The notices are rendered by the compose module beside this one.",
    },
  ],
} as const satisfies Module
