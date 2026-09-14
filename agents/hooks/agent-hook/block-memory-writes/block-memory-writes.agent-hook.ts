import type { AgentHook } from "akasha/agents/hooks/agent-hook/agent-hook.page-type.types.ts"

export const blockMemoryWrites = {
  id: "01a0a0d4-3357-7104-a477-9c33e912a4f6",
  type: "agent-hook",
  slug: "block-memory-writes",
  definition: "the hook refusing a shell write onto a filesystem the machine holds in memory",
  code: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A filesystem held in memory is read from what the kernel says is mounted.",
    },
    {
      invariantKind: "departure",
      statement: "Which filesystems those are is read rather than named here.",
    },
    {
      invariantKind: "departure",
      statement: "A write landing under one of those mounts is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A byte written there is memory the fleet has back only once the file goes.",
    },
    {
      invariantKind: "departure",
      statement: "A removal is let through, because a removal is what gives the memory back.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the mount rather than the path alone.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names where scratch goes instead.",
    },
    {
      invariantKind: "departure",
      statement: "A payload this cannot read judges nothing and exits so the dispatch refuses.",
    },
    {
      invariantKind: "constraint",
      statement: "What a shell write is comes from the hook guarding akasha's own folder.",
    },
    {
      invariantKind: "absence",
      statement: "A path named only inside a program handed to an interpreter is not seen.",
    },
    {
      invariantKind: "absence",
      statement: "A mount made after this call began is not seen by this call.",
    },
  ],
} as const satisfies AgentHook
