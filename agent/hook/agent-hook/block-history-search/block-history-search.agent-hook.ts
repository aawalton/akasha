import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockHistorySearch = {
  id: "01a09cad-0b46-7233-a9e6-55c321ffc10b",
  type: "page-type/agent-hook",
  slug: "block-history-search",
  definition: "a refusal of the git commands that find the commits that change a text",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A search of history for a change to some text is refused wherever this reads it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`-S`, `-G` and `--pickaxe-regex` are the three flags read as such a search.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`log` and `rev-list` are the two acts taken as such a search.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag joined to its text is read as that flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names what answers the question that is not a history question.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Such a search reads every commit in the repository whatever flags narrow it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Dropping `--all` from such a search costs the same.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Which files name a symbol now is answered by the index and by a working-tree search.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No search of commit messages is read here.",
    },
  ],
} as const satisfies AgentHook
