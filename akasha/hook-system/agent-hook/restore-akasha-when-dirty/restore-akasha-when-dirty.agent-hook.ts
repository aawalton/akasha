import type { AgentHook } from "../agent-hook.page-type.ts"

export const restoreAkashaWhenDirty = {
  id: "01a05416-b60f-7a58-ba7a-e15ec10b3c19",
  pageTypeSlug: "agent-hook",
  slug: "restore-akasha-when-dirty",
  definition: "the hook putting akasha back as HEAD has it when a call leaves it changed",
  code: "ts",
  test: "ts",
  runsAt: ["PostToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The akasha folder is never left changed and uncommitted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call leaving it changed is told so, and told which paths went back, because a write undone in silence reads as a write that worked.",
    },
    {
      invariantKind: "departure",
      statement:
        "What went back is judged by what stands, never by what the call said, so a write reaches this whatever tool carried it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tree goes back under the landing lock, so a landing part way through is never taken for a write around the gate.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing holding the lock longer than this waits leaves the tree alone, an unlanded change being its own rather than a stray.",
    },
    {
      invariantKind: "departure",
      statement: "A file the call added goes, and a file it altered or took away comes back.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing outside the akasha folder is touched.",
    },
    {
      invariantKind: "constraint",
      statement:
        "This answers after the write, so what it holds is that nothing stands on an ungated change, not that none is made.",
    },
  ],
} as const satisfies AgentHook
