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
      statement: "A call leaving the akasha folder changed is told so.",
    },
    {
      invariantKind: "departure",
      statement: "A call leaving the akasha folder changed is told which paths went back.",
    },
    {
      invariantKind: "departure",
      statement:
        "What went back is judged by what the folder holds rather than by what the call said.",
    },
    {
      invariantKind: "departure",
      statement: "The folder is read again once it has been put back.",
    },
    {
      invariantKind: "departure",
      statement: "A path still changed once the folder is read again did not go back.",
    },
    {
      invariantKind: "departure",
      statement: "A call that put nothing back is told nothing and goes through.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry for a path in neither the commit nor the folder is taken out of the index.",
    },
    {
      invariantKind: "departure",
      statement: "The tree goes back under the landing lock.",
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
      statement: "Nothing outside the akasha folder is touched.",
    },
    {
      invariantKind: "constraint",
      statement: "This hook answers after the write.",
    },
    {
      invariantKind: "constraint",
      statement:
        "What this holds is that nothing stands on an ungated change rather than that none was made.",
    },
  ],
} as const satisfies AgentHook
