import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const coachingContext = {
  id: "01a0685d-cca7-79c0-ba02-12d93d204b7a",
  pageTypeSlug: "module",
  slug: "coaching-context",
  definition:
    "the kit a session can be loaded with and the coaching constraints a focus is bound by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A constraint that is not active binds nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A constraint tagged with a focus binds that focus, and one tagged with all binds every focus.",
    },
    {
      invariantKind: "departure",
      statement: "Every active constraint binds where no focus is settled.",
    },
    {
      invariantKind: "departure",
      statement: "A constraint tagged with no focus at all binds only where no focus is settled.",
    },
    {
      invariantKind: "departure",
      statement: "A piece of kit saying nothing about whether it is there is there.",
    },
    {
      invariantKind: "gap",
      statement:
        "What a piece of kit is, how it is set up and what it loads are no page properties of it yet.",
    },
    {
      invariantKind: "gap",
      statement:
        "No equipment item page stands, so nothing states the kit a session is loaded with.",
    },
  ],
} as const satisfies Module
