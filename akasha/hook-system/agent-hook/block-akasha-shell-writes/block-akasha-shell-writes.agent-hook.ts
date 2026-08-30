import type { AgentHook } from "../agent-hook.page-type.ts"

export const blockAkashaShellWrites = {
  id: "01a04ee9-8899-7bf9-a3e7-3322e3b145d7",
  pageTypeSlug: "agent-hook",
  slug: "block-akasha-shell-writes",
  definition: "the hook refusing a shell write that lands inside akasha",
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
        "The guarded roots are the akasha folder and `.git/data`, the same as for an edit.",
    },
    {
      invariantKind: "departure",
      statement: "A copy or a move is judged on where it puts things.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tool told to write the file it reads is judged on every path it names, the flag saying so being what parts it from the same tool reading.",
    },
    {
      invariantKind: "departure",
      statement: "A descriptor redirected onto another is no path, and is passed over.",
    },
    {
      invariantKind: "gap",
      statement: "No shell write reaches inside a guarded root.",
    },
    {
      invariantKind: "gap",
      statement: "A path a word stands for rather than spells is judged as a spelled one is.",
    },
  ],
} as const satisfies AgentHook
