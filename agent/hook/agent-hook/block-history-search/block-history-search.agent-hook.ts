import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockHistorySearch = {
  id: "01a09cad-0b46-7233-a9e6-55c321ffc10b",
  type: "agent-hook",
  slug: "block-history-search",
  definition: "a refusal of a search of history for a change to some text",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A search of history for a change to some text is refused wherever this reads it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`-S`, `-G` and `--pickaxe-regex` are the three flags read as such a search.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`log` and `rev-list` are the two acts read as such a search.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag joined to its text is read as that flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names what answers the question that is not a history question.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Such a search reads every commit in the repository whatever flags narrow it.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Dropping `--all` from such a search costs the same.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "Which files name a symbol now is answered by the index and by a working-tree search.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No search of commit messages is read here.",
    },
  ],
} as const satisfies AgentHook
