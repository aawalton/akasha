import type { AgentHook } from "akasha/agents/hooks/agent-hooks/agent-hook.page-type.types.ts"

export const weighBashCall = {
  id: "01a0925f-7a0c-7b9c-9414-3402ab8afe91",
  type: "agent-hook",
  slug: "weigh-bash-call",
  definition:
    "the hook putting a bash call in a group of its own so what that call spends is known",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This hook judges nothing and refuses no call.",
    },
    {
      invariantKind: "departure",
      statement: "A call is handed back with the line reading the weighing script above it.",
    },
    {
      invariantKind: "departure",
      statement: "The command an agent wrote is left whole below that line.",
    },
    {
      invariantKind: "departure",
      statement: "This hook is named to sort after every hook that judges a bash call.",
    },
    {
      invariantKind: "departure",
      statement: "Each of those judges the command the agent wrote rather than the wrapped one.",
    },
    {
      invariantKind: "departure",
      statement: "The script is reached through the index rather than by a path spelled here.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a call spent is appended beside the page of the seat the call was made from.",
    },
    {
      invariantKind: "departure",
      statement: "A call a subagent made is weighed against that subagent's seat.",
    },
    {
      invariantKind: "departure",
      statement: "Which file the line goes in is settled here, so a line rolls at the ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A file a line opens is filed in the path index before the shell reaches it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The fill is judged by the line's opening, since the rest of that line is written by the shell.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call is named by the first line the agent wrote rather than by the whole command.",
    },
    {
      invariantKind: "departure",
      statement: "A word handed to the shell is quoted so the shell reads that word whole.",
    },
    {
      invariantKind: "departure",
      statement: "The groups calls left behind are taken away as the next call opens.",
    },
    {
      invariantKind: "departure",
      statement: "A group named for a process still running is left where it is.",
    },
    {
      invariantKind: "departure",
      statement: "A call this could not weigh is handed back unchanged rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose page is not there is a call handed back unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A throw anywhere here is a call handed back unchanged.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what the call said or what the call did.",
    },
  ],
} as const satisfies AgentHook
