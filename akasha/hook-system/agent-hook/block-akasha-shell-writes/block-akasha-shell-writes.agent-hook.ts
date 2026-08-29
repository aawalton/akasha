import type { AgentHook } from "../agent-hook.page-type.ts"

export const blockAkashaShellWrites = {
  id: "01a04ee9-8899-7bf9-a3e7-3322e3b145d7",
  pageTypeSlug: "agent-hook",
  slug: "block-akasha-shell-writes",
  definition: "the hook refusing a copy, a move or a redirect that lands inside akasha",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call is refused for where it lands, never for what it is.",
    },
    {
      invariantKind: "departure",
      statement:
        "The guarded roots are the akasha folder and `.git/data`, as they are for an edit.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only a copy, a move and a redirect are sampled, so this narrows an open world rather than closing it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A copy or a move is judged on where it puts things, so reading a file out of akasha stands.",
    },
    {
      invariantKind: "departure",
      statement: "A descriptor redirected onto another is no path, and is passed over.",
    },
    {
      invariantKind: "absence",
      statement:
        "This closes nothing. A shell writes a file in more ways than can be named, and every one not named here still lands.",
    },
    {
      invariantKind: "gap",
      statement: "No shell write reaches inside a guarded root.",
    },
  ],
} as const satisfies AgentHook
