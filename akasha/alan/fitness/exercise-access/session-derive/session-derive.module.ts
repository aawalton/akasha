import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const sessionDerive = {
  id: "01a0683a-6e1b-761e-a848-4e1718e41227",
  pageTypeSlug: "module",
  slug: "session-derive",
  definition: "the slugs and set numbers a session's writes are named by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A session's slug says the day of the week, the focus and the day.",
    },
    {
      invariantKind: "departure",
      statement: "A session on a rest day drops the focus from its slug rather than spelling it.",
    },
    {
      invariantKind: "departure",
      statement: "A set's number is one past the highest already logged against its session.",
    },
    {
      invariantKind: "departure",
      statement: "The first set of a session is numbered one.",
    },
    {
      invariantKind: "departure",
      statement: "A slug already taken is followed by the same slug numbered from two.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a page.",
    },
  ],
} as const satisfies Module
