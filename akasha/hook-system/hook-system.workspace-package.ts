import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const hookSystem = {
  id: "01a04e0a-f8f9-7f51-97ed-edfe4be9ba2f",
  pageTypeSlug: "workspace-package",
  slug: "hook-system",
  definition: "how a tool call is judged",
  manifest: "json",
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
      statement: "A hook stands in the akasha folder and is registered outside the akasha folder.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is registered by the name its page carries rather than by its path.",
    },
    {
      invariantKind: "departure",
      statement: "What that name reaches is worked out at the call rather than at the spawn.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is TypeScript rather than a shell script.",
    },
    {
      invariantKind: "departure",
      statement: "A hook that refuses names the akasha command that does what was asked.",
    },
    {
      invariantKind: "departure",
      statement: "A hook says what the hook does not catch when the hook is asked.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A hook over the ways a shell writes a file samples an open world that is too many ways to name.",
    },
  ],
} as const satisfies WorkspacePackage
