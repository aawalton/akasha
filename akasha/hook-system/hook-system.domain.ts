import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const hookSystem = {
  id: "01a04e0a-f8f9-7f51-97ed-edfe4be9ba2f",
  pageTypeSlug: "domain",
  slug: "hook-system",
  definition: "how a tool call is judged",
  partSlugs: [
    "page-type/agent-hook",
    "module/bun-calls",
    "module/chain-refusal",
    "module/git-calls",
    "module/hook-answer",
    "module/hook-judging",
    "module/hook-payload",
    "module/path-showing",
    "module/settling",
    "module/shell-calls",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hook stands in the akasha folder and is registered outside it.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is TypeScript, and never a shell script.",
    },
    {
      invariantKind: "departure",
      statement: "A hook that refuses names the akasha command that does what was asked.",
    },
    {
      invariantKind: "departure",
      statement: "A hook says what it does not catch when it is asked.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A hook over the ways a shell writes a file samples an open world, too many to name.",
    },
  ],
} as const satisfies Domain
