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
      statement: "A call leaving it changed is told so.",
    },
    {
      invariantKind: "departure",
      statement: "A call leaving it changed is told which paths went back.",
    },
    {
      invariantKind: "departure",
      statement:
        "What went back is judged by what stands rather than by what the call said. A write reaches this whatever tool carried it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tree goes back under the landing lock. A landing part way through is never taken for a write around the gate.",
    },
    {
      invariantKind: "departure",
      statement: "A landing holding the lock longer than this waits leaves the tree alone.",
    },
    {
      invariantKind: "departure",
      statement: "An unlanded change is its own rather than a stray.",
    },
    {
      invariantKind: "departure",
      statement: "A file the call added goes.",
    },
    {
      invariantKind: "departure",
      statement: "A file it altered or took away comes back.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing outside the akasha folder is touched.",
    },
    {
      invariantKind: "constraint",
      statement:
        "This answers after the write. What it holds is that nothing stands on an ungated change rather than that none was made.",
    },
  ],
} as const satisfies AgentHook
