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
        "A test asks about a call made at the root, because that is where an agent's calls are made. A call made anywhere else is the exception, and a test says so out loud.",
    },
    {
      invariantKind: "departure",
      statement:
        "The root a hook is judged against is bound once, so a test cannot hand it one root and ask about a call made under another without saying it meant to.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here judges. A hook's own judgement is handed in and handed back with its root bound, so no rule about what is refused stands here.",
    },
    {
      invariantKind: "absence",
      statement:
        "No test is written here, as none is written for hook-payload. What stands here is stood up by the tests that reach for it, and proving itself would prove nothing about any hook.",
    },
  ],
} as const satisfies Module
