import type { Module } from "../../code-system/module/module.page-type.ts"

export const hookJudging = {
  id: "01a04f83-5df2-71b1-a666-6309398763b8",
  pageTypeSlug: "module",
  slug: "hook-judging",
  definition: "a hook's judgement asked the way a test asks it, from the root it stands in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A test asks about a call made at the root. A call made anywhere else is the exception.",
    },
    {
      invariantKind: "departure",
      statement: "A test says so out loud.",
    },
    {
      invariantKind: "departure",
      statement:
        "The root a hook is judged against is bound once. A test asking about a call under another root must name it explicitly.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here judges. A hook's own judgement is handed in and handed back with its root bound.",
    },
    {
      invariantKind: "absence",
      statement:
        "No test is written here. What stands here is stood up by the tests that reach for it.",
    },
    {
      invariantKind: "absence",
      statement: "Proving itself would prove nothing about any hook.",
    },
  ],
} as const satisfies Module
