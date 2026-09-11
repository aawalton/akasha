import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const hook = {
  id: "01a04e0a-f8f9-7f51-97ed-edfe4be9ba2f",
  type: "domain",
  slug: "hook",
  definition: "how a tool call is judged",
  pluralSlug: "hooks",
  parts: [
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
    "module/hook-dispatch",
    "module/hook-links",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hook is in the akasha folder and is registered outside the akasha folder.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is registered by the name its page has rather than by its path.",
    },
    {
      invariantKind: "departure",
      statement: "The path that name reaches is worked out at the call rather than at the spawn.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is TypeScript rather than a shell script.",
    },
    {
      invariantKind: "departure",
      statement: "A hook that refuses names the akasha command that does the work asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A hook says the calls the hook does not catch when the hook is asked.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A hook over the ways a shell writes a file samples an open world that is too many ways to name.",
    },
  ],
} as const satisfies Domain
