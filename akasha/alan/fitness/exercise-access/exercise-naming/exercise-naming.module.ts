import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const exerciseNaming = {
  id: "01a0685c-7d81-7568-a229-77f9d3e6312c",
  pageTypeSlug: "module",
  slug: "exercise-naming",
  definition: "the name a set log, a constraint or a mobility reading is filed under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A set log is named for its session, its exercise and its number in that pair.",
    },
    {
      invariantKind: "departure",
      statement: "The first set logged against an exercise in a session is set one.",
    },
    {
      invariantKind: "departure",
      statement: "A number already taken is stepped past rather than reused.",
    },
    {
      invariantKind: "departure",
      statement: "A mobility reading naming no side is named without one.",
    },
    {
      invariantKind: "departure",
      statement: "A stem drops every character that is no lowercase letter and no digit.",
    },
  ],
} as const satisfies Module
